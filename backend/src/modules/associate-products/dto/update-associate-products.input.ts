import { PartialType } from '@nestjs/swagger';
import { CreateAssociateProductsInput } from './create-associate-products.input';

export class UpdateAssociateProductsInput extends PartialType(
  CreateAssociateProductsInput,
) {
  id: number;
}
