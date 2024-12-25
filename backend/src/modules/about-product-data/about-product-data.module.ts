import { Module } from '@nestjs/common';
import { AboutProductDataService } from './about-product-data.service';
import { AboutProductDataController } from './about-product-data.controller';
import { AboutProductTopBarImageModule } from '../about-product-top-bar-image/about-product-top-bar-image.module';
import { AboutProductSizeChartImageModule } from '../about-product-size-chart-image/about-product-size-chart-image.module';

@Module({
  imports: [AboutProductTopBarImageModule, AboutProductSizeChartImageModule],
  controllers: [AboutProductDataController],
  providers: [AboutProductDataService],
  exports: [AboutProductDataService],
})
export class AboutProductDataModule {}
