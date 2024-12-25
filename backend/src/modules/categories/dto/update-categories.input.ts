import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoriesInput } from './create-categories.input';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UpdateCategoriesInput extends PartialType(CreateCategoriesInput) {
  id: number;
}
