import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAboutProductDataInput {
  @ApiProperty()
  category_id: number;

  @ApiProperty()
  subcategory_id: number;

  @ApiPropertyOptional()
  product_description_1: string;

  @ApiPropertyOptional()
  product_description_2: string;

  @ApiPropertyOptional()
  product_description_1_ab: string;

  @ApiPropertyOptional()
  product_description_2_sb: string;

  @ApiProperty({ type: [String], isArray: true })
  top_bar_images_ids: string[];

  @ApiProperty({ type: [String], isArray: true })
  size_chart_image_ids: string[];

  @ApiProperty({ type: [String], isArray: true })
  bottom_bar_images_ids: string[];

  created_at: number;
}
