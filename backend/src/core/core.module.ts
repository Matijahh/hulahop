import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './guards/auth-guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { UsersModule } from 'src/modules/users/users.module';
import { RolesGuard } from './guards/role.guard';

@Module({
  controllers: [],
  imports: [UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersModule],
})
export class CoreModule {}
