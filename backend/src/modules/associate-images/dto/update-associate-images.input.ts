import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAssociateImagesInput } from './create-associate-images.input';

export class UpdateAssociateImagesInput extends PartialType(
  CreateAssociateImagesInput,
) {
  id: number;
}
