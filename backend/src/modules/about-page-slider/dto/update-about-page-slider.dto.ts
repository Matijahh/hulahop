import { PartialType } from '@nestjs/swagger';
import { CreateAboutPageSliderInput } from './create-about-page-slider.dto';

export class UpdateAboutPageSliderInput extends PartialType(
  CreateAboutPageSliderInput,
) {
  id: number;
}
