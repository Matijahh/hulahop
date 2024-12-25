import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class UpdateCategoriesOrder {
  id: number;
  @ApiProperty()
  category_order: number;
}
