import { Module } from '@nestjs/common';
import { ShopSliderService } from './shop-slider.service';
import { ShopSliderController } from './shop-slider.controller';

@Module({
  controllers: [ShopSliderController],
  providers: [ShopSliderService],
  exports: [ShopSliderService],
})
export class ShopSliderModule {}
