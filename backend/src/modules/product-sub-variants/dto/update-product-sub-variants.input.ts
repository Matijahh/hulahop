import { PartialType } from '@nestjs/swagger';
import { CreateProductSubVariantsInput } from './create-product-sub-variants.input';

export class UpdateProductSubVariantsInput extends PartialType(
  CreateProductSubVariantsInput,
) {
  id: number;
}
