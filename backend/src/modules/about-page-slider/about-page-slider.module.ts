import { Module } from '@nestjs/common';
import { AboutPageSliderService } from './about-page-slider.service';
import { AboutPageSliderController } from './about-page-slider.controller';

@Module({
  controllers: [AboutPageSliderController],
  providers: [AboutPageSliderService],
  exports: [AboutPageSliderService],
})
export class AboutPageSliderModule {}
