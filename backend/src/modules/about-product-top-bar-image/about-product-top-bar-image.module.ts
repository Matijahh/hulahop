import { Module } from '@nestjs/common';
import { AboutProductTopBarImageService } from './about-product-top-bar-image.service';

@Module({
  providers: [AboutProductTopBarImageService],
  exports: [AboutProductTopBarImageService],
})
export class AboutProductTopBarImageModule {}
