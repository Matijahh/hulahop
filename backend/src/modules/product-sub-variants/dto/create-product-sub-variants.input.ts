import { ApiProperty } from '@nestjs/swagger';

export class CreateProductSubVariantsInput {
  @ApiProperty()
  product_variant_id: number | null;

  @ApiProperty()
  value: string | null;

  @ApiProperty()
  quantity: number | null;
}
