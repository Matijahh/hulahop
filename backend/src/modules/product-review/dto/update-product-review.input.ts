import { PartialType } from '@nestjs/swagger';
import { CreateProductReviewInput } from './create-product-review.input';

export class UpdateProductReviewInput extends PartialType(
  CreateProductReviewInput,
) {
  id: number;
}
