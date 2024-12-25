import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UserSessionModule } from '../user-session/user-session.module';
import { MailerModule } from 'src/providers/mailer/mailer.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({}),
    UserSessionModule,
    MailerModule,
  ],
  providers: [AuthService, UsersService, AtStrategy, RtStrategy],
  exports: [AuthService, UsersModule],
})
export class AuthModule {}
