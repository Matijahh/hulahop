import { Module } from '@nestjs/common';
import { AboutProductSizeChartImageService } from './about-product-size-chart-image.service';

@Module({
  providers: [AboutProductSizeChartImageService],
  exports: [AboutProductSizeChartImageService],
})
export class AboutProductSizeChartImageModule {}
