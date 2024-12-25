import { PartialType } from '@nestjs/swagger';
import { CreateCartsInput } from './create-carts.input';

export class UpdateCartsInput extends PartialType(CreateCartsInput) {
  id: number;
}
