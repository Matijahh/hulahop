import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, ValidateNested } from 'class-validator';
import { productSubVariants } from '../../products/dto/create-products.input';
import { Type } from 'class-transformer';

export class CreateProductVariantsInput {
  @ApiProperty()
  product_id: number | null;

  @ApiProperty()
  color_id: number | null;

  @ApiProperty()
  image_id: string | null;

  @ApiProperty({ type: [productSubVariants] })
  @Type(() => productSubVariants)
  @ValidateNested({ each: true })
  sub_variants: productSubVariants[];

  created_at: string | null;
  updated_at: string | null;
}
