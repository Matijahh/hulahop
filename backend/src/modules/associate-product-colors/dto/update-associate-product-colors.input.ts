import { PartialType } from '@nestjs/swagger';
import { CreateAssociateProductColorsInput } from './create-associate-product-colors.input';

export class UpdateAssociateProductColorsInput extends PartialType(
  CreateAssociateProductColorsInput,
) {
  id: number;
}
