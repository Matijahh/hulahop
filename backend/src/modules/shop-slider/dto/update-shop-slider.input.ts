import { PartialType } from '@nestjs/swagger';
import { CreateShopSliderInput } from './create-shop-slider.input';

export class UpdateShopSliderInput extends PartialType(CreateShopSliderInput) {
  id: number;
}
