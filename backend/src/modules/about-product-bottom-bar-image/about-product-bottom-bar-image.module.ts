import { Module } from '@nestjs/common';
import { AboutProductBottomBarImageService } from './about-product-bottom-bar-image.service';
import { AboutProductBottomBarImageController } from './about-product-bottom-bar-image.controller';

@Module({
  controllers: [AboutProductBottomBarImageController],
  providers: [AboutProductBottomBarImageService],
  exports: [AboutProductBottomBarImageService],
})
export class AboutProductBottomBarImageModule {}
