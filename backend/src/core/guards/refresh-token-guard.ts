import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('jwt-refresh') {

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException('Token Expired');
    }
    return user;
  }
}
