import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReturnProductsInput } from './create-return-products.input';

export class UpdateReturnProductsInput extends PartialType(
  CreateReturnProductsInput,
) {
  id: number;
}
