import { PartialType } from '@nestjs/swagger';
import { CreateAboutProductBottomBarImageInput } from './create-about-product-bottom-bar-image.input';

export class UpdateAboutProductBottomBarImageInput extends PartialType(
  CreateAboutProductBottomBarImageInput,
) {
  id: number;
}
