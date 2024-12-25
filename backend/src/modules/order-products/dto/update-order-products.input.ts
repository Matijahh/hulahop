import { PartialType } from '@nestjs/swagger';
import { CreateOrderProductsInput } from './create-order-products.input';

export class UpdateOrderProductsInput extends PartialType(
  CreateOrderProductsInput,
) {
  id: number;
}
