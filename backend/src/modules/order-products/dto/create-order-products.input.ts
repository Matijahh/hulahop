import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateOrderProductsInput {
  @ApiProperty()
  order_id: number | null;

  @ApiProperty()
  associate_product_id: number | null;

  @ApiProperty()
  quantity: number | null;
}
