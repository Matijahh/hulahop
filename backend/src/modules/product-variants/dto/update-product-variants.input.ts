import { PartialType } from '@nestjs/swagger';
import { CreateProductVariantsInput } from './create-product-variants.input';

export class UpdateProductVariantsInput extends PartialType(
  CreateProductVariantsInput,
) {
  id: number;
}
