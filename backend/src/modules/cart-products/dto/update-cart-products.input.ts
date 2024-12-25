import { PartialType } from '@nestjs/swagger';
import { CreateCartProductsInput } from './create-cart-products.input';

export class UpdateCartProductsInput extends PartialType(
  CreateCartProductsInput,
) {
  id: number;
}
