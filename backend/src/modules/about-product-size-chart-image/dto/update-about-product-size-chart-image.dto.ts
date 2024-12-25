import { PartialType } from '@nestjs/swagger';
import { CreateAboutProductSizeChartImageDto } from './create-about-product-size-chart-image.dto';

export class UpdateAboutProductSizeChartImageDto extends PartialType(CreateAboutProductSizeChartImageDto) {}
