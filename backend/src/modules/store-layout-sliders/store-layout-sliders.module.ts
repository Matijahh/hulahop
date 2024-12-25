import { Module } from '@nestjs/common';
import { StoreLayoutSlidersService } from './store-layout-sliders.service';

@Module({
  providers: [StoreLayoutSlidersService],
  exports: [StoreLayoutSlidersService],
})
export class StoreLayoutSlidersModule {}
