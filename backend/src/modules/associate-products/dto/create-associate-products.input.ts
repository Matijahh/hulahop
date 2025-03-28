import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssociateProductsInput {
  @ApiProperty()
  product_id: number | null;

  user_id: number | null;

  @ApiProperty()
  @MaxLength(100)
  name: string | null;

  @ApiPropertyOptional()
  description: string | null;

  @ApiPropertyOptional()
  cover_image_color_id: number | null;

  @ApiProperty()
  image_json: any;

  @ApiPropertyOptional()
  image_json_back: any;

  @ApiProperty({ type: [Number], isArray: true, nullable: true })
  selected_colors: number[] | null;

  @ApiProperty()
  price: string | null;

  @ApiProperty()
  double_design_price: string | null;

  @ApiProperty()
  base64: string | null;

  @ApiPropertyOptional()
  base64_back: string | null;

  created_at: string | null;

  updated_at: string | null;
}
