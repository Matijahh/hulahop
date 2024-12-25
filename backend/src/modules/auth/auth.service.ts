import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'node:crypto';

import { comparePassword, generatePassword } from '../../commons';
import { config } from '../../commons/config';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { SignupUserInput } from './dto/signup-user.input';
import { CreateUsersInput } from '../users/dto/create-users.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { TokenTime } from '../../commons/constant';
import { UserSessionService } from '../user-session/user-session.service';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { MoreThan } from 'typeorm';
import { MailerService } from 'src/providers/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userSessionService: UserSessionService,
    private mailerService: MailerService,
  ) {}

  async login(data: LoginUserInput) {
    let user = null;

    if (data.email) {
      user = await this.usersService.findOne({
        where: { email: data.email.toLowerCase(), status: true },
        select: { password: true, id: true, type: true },
      });
    }

    if (data.mobile) {
      user = await this.usersService.findOne({
        where: { mobile: data.mobile, status: true },
        select: { password: true, id: true, type: true },
      });
    }

    if (!user) {
      throw new NotFoundException('User does not exist or inactive!');
    }

    if (user.type === 'USER' && !!data.mobile) {
      throw new NotFoundException('User email required!');
    }

    const isMatchPassword = await comparePassword(data.password, user.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException('Password does not match');
    }

    const tokens = await this.createTokens(user.id, user.type);

    const setRefreshToken = await this.userSessionService.create({
      user_id: user.id,
      refresh_token: tokens.refresh_token,
    });

    if (!setRefreshToken) {
      throw new InternalServerErrorException('Something wrong happen!');
    }
    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      type: user.type,
    };
  }

  async signup(data: SignupUserInput) {
    const user = await this.usersService.findOne({
      where: [{ email: data.email.toLowerCase() }, { mobile: data.mobile }],
    });
  
    if (user) {
      throw new Error('You are already registered! Please login.');
    }
  
    if (data.email) {
      data.email = data.email.toLowerCase();
    }
    if (!data.image_id || data.image_id === '') {
      data.image_id = null;
    }
  
    data.password = await generatePassword(data.password);
    data.created_at = Date.now().toString();
    
    const createdUser = await this.usersService.create(data as CreateUsersInput);
  
    const tokens = await this.createTokens(createdUser.id, createdUser.type);

    await this.userSessionService.create({
      user_id: createdUser.id,
      refresh_token: tokens.refresh_token,
    });
  
    return {
      user: createdUser,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
  

  async resetMyPassword(userId: number, data: ResetPasswordInput) {
    const user = await this.updateUserPassword(userId, data.password);
    return user;
  }

  async updateUserPassword(userId: number, password: string) {
    password = await generatePassword(password);
    return this.usersService.update(userId, {
      id: userId,
      password,
    });
  }

  async refresh(refresh_token: string, user_id: number) {
    const refreshToken = await this.userSessionService.findOne({
      where: { refresh_token, user_id },
      relations: { user: true },
    });
    if (!refreshToken || refreshToken.user.active === false) {
      throw new InternalServerErrorException('Something wrong happen!');
    }
    const decodeToken = this.jwtService.decode(
      refreshToken.refresh_token.replace(/^Bearer\s/, ''),
    );
    const access_token = await Promise.resolve(
      this.jwtService.sign(
        {
          id: user_id,
          type: [decodeToken['type']],
        },
        {
          secret: config.accessKey,
          expiresIn: TokenTime.ACCESS_TOKEN_TIME,
        },
      ),
    );
    const result = { access_token };
    return result;
  }

  private async createTokens(user_id: number, type: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user_id,
          type: type,
        },
        {
          secret: config.accessKey,
          expiresIn: TokenTime.ACCESS_TOKEN_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          id: user_id,
          type: type,
        },
        {
          secret: config.refreshKey,
          expiresIn: TokenTime.REFRESH_TOKEN_TIME,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async forgotPassword(params: ForgotPasswordInput) {
    const { email } = params;

    const user = await this.usersService.findOne({
      where: { email: email.toLowerCase(), status: true },
    });

    if (user) {
      user.resetPasswordToken = randomBytes(20).toString('hex');

      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 1);
      user.resetPasswordTokenExpiry = currentDate.getTime();

      await this.usersService.update(user.id, {
        ...user,
      });

      this.mailerService.sendEmailBySMTP({
        template: 'forgotPassword',
        from: process.env.SMTP_SENDER,
        to: user.email,
        data: {
          resetPasswordUrl: `${process.env.APP_URL}/reset-password/${user.resetPasswordToken}`,
        },
      });
    }
  }

  async verifyResetPasswordToken(updatePasswordDto: ResetPasswordInput) {
    const user = await this.usersService.findOne({
      where: {
        resetPasswordToken: updatePasswordDto.token,
        resetPasswordTokenExpiry: MoreThan(Date.now()),
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid Token or it has been expired.');
    }

    return this.updateUserPassword(user.id, updatePasswordDto.password);
  }
}
