import { PartialType } from '@nestjs/swagger';
import { CreateAboutProductDataInput } from './create-about-product-data.dto';

export class UpdateAboutProductDataInput extends PartialType(
  CreateAboutProductDataInput,
) {
  id: number;
  updated_at: number;
}
