import { PartialType } from '@nestjs/swagger';
import { CreateSizesInput } from './create-sizes.input';

export class UpdateSizesInput extends PartialType(CreateSizesInput) {
  id: number;
}
