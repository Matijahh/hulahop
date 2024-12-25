import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();

    const skip = this.reflector.get<string[]>('skipAuth', context.getHandler());
    if (skip) {
      return true;
    }

    const accessToken = request.headers.authorization;
    if (!accessToken) {
      throw new BadRequestException('Token expired');
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException('Token expired');
    }
    if (user?.user_id) {
      return this.usersService.findOne({ where: { id: user.user_id } });
    }
    return user;
  }
}

export const SkipAuth = () => SetMetadata('skipAuth', true);
