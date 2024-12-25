import { PartialType } from '@nestjs/swagger';
import { CreateImagesInput } from './create-images.input';

export class UpdateImagesInput extends PartialType(CreateImagesInput) {
  id: string;
}
