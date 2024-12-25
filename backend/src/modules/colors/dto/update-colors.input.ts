import { PartialType } from '@nestjs/swagger';
import { CreateColorsInput } from './create-colors.input';

export class UpdateColorsInput extends PartialType(CreateColorsInput) {
  id: number;
}
