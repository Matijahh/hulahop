import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateReturnProductsInput {
  @ApiProperty()
  order_id: number | null;

  @ApiProperty()
  associate_product_id: number | null;

  @ApiProperty()
  reason: string | null;

  @ApiProperty()
  quantity: number | null;
}
