import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { RefreshToken } from './dto/refresh.input';
import { RefreshTokenAuthGuard } from '../../core/guards/refresh-token-guard';
import { CurrentUserDto } from './dto/current-user.dto';
import { CurrentUser } from '../../commons/decorator/current-user.decorator';
import { SkipAuth } from '../../core/guards/auth-guard';
import { ResetMyPasswordInput } from './dto/reset-my-password.input';
import { SignupUserInput } from './dto/signup-user.input';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipAuth()
  @Post('/sign-up')
  async signup(@Body() user: SignupUserInput, @Res() res: Response) {
    const result = await this.authService.signup(user);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User signup successfully',
    );
  }

  @SkipAuth()
  @Post('/login')
  async login(@Body() user: LoginUserInput, @Res() res: Response) {
    const result = await this.authService.login(user);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User login successfully',
    );
  }

  @Post('/reset-my-password')
  async resetMyPassword(
    @Res() res: Response,
    @Body() data: ResetMyPasswordInput,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    const result = await this.authService.resetMyPassword(currentUser.id, data);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User password reset successfully',
    );
  }

  @SkipAuth()
  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordInput) {
    await this.authService.forgotPassword(forgotPasswordDto);
  }

  @SkipAuth()
  @Post('/update-password')
  async verifyResetPasswordToken(
    @Body() updatePasswordDto: ResetPasswordInput,
    @Res() res: Response,
  ) {
    if (!updatePasswordDto.token) {
      throw new BadRequestException('Invalid Token');
    }

    const result =
      await this.authService.verifyResetPasswordToken(updatePasswordDto);
    return baseController.getResult(res, HttpStatus.OK, Boolean(result));
  }

  @SkipAuth()
  @Post('/refresh')
  @UseGuards(RefreshTokenAuthGuard)
  async refresh(
    @Res() res: Response,
    @Body() token: RefreshToken,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    const result = await this.authService.refresh(
      token.refresh_token,
      currentUser.id,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User refresh token fetched successfully',
    );
  }
}
