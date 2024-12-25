import { Module } from '@nestjs/common';
import { StoreLayoutDetailsService } from './store-layout-details.service';
import { StoreLayoutDetailsController } from './store-layout-details.controller';
import { StoreLayoutSlidersModule } from '../store-layout-sliders/store-layout-sliders.module';

@Module({
  controllers: [StoreLayoutDetailsController],
  providers: [StoreLayoutDetailsService],
  imports: [StoreLayoutSlidersModule],
  exports: [StoreLayoutDetailsService, StoreLayoutSlidersModule],
})
export class StoreLayoutDetailsModule {}
