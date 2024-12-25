import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateWishListInput {
  user_id: number | null;

  @ApiProperty()
  associate_product_id: number | null;
}
