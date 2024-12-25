import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { SkipAuth } from 'src/core/guards/auth-guard';
import { CurrentUser } from 'src/commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService){}

    @Get("performance")
    async getPerformanceData(@CurrentUser() currentUser: CurrentUserDto){
        return this.dashboardService.getPerformanceData(currentUser);
    }

    @Get("monthly-stats/orders")
    async getMonthlyStats(@CurrentUser() currentUser: CurrentUserDto){
        return this.dashboardService.getMonthlyOrderNumberStats(currentUser);
    }

    @Get("monthly-stats/earnings")
    async getMonthlyEarnings(@CurrentUser() currentUser: CurrentUserDto){
        return this.dashboardService.getMonthlyEarningsStats(currentUser);
    }
}
