import { PartialType } from '@nestjs/swagger';
import { CreateWishListInput } from './create-wish-list.input';

export class UpdateWishListInput extends PartialType(CreateWishListInput) {
  id: number;
}
