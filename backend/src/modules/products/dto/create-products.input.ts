import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength, ValidateNested } from 'class-validator';

export class productSubVariants {
  @ApiProperty()
  value: string | null;

  @ApiProperty()
  quantity: number | null;
}

export class productVariants {
  @ApiProperty()
  color_id: number | null;

  @ApiProperty()
  image_id: string | null;

  @ApiProperty({ type: [productSubVariants] })
  @Type(() => productSubVariants)
  @ValidateNested({ each: true })
  sub_variants: productSubVariants[];
}
export class CreateProductsInput {
  @ApiProperty()
  @MaxLength(100)
  name: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  image_id: string | null;

  @ApiProperty()
  price: number | null;

  @ApiPropertyOptional()
  category_id: number | null;

  @ApiPropertyOptional()
  subcategory_id: number | null;

  @ApiPropertyOptional({ default: true })
  status: boolean | null;

  created_at: number | null;

  updated_at: number | null;

  @ApiPropertyOptional()
  x_position: string | null;

  @ApiPropertyOptional()
  y_position: string | null;

  @ApiPropertyOptional()
  frame_width: string | null;

  @ApiPropertyOptional()
  frame_height: string | null;

  @ApiProperty({ type: [productVariants] })
  @Type(() => productVariants)
  @ValidateNested({ each: true })
  product_variants: productVariants[];
}
