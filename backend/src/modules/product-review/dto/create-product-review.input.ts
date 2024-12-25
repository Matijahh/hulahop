import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateProductReviewInput {
  @ApiProperty()
  associate_product_id: number | null;

  @ApiProperty()
  review: string | null;
}
