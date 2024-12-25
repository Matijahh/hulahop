import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsersService } from '../users/users.service';


@Module({
  providers: [
    DashboardService,
    UsersService
  ],
  controllers: [DashboardController]
})
export class DashboardModule {}
