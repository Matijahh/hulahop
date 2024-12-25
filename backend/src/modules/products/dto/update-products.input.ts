import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductsInput } from './create-products.input';

export class UpdateProductsInput extends PartialType(CreateProductsInput) {
  id: number;
}
