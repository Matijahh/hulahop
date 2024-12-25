import { PartialType } from '@nestjs/swagger';
import { CreateSubCategoriesInput } from './create-sub-categories.input';

export class UpdateSubCategoriesInput extends PartialType(
  CreateSubCategoriesInput,
) {
  id: number;
}
