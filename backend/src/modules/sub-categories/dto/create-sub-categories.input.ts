import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSubCategoriesInput {
  @ApiProperty()
  @IsNotEmpty()
  category_id: number | null;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(64)
  name: string | null;

  @ApiPropertyOptional()
  image_id: string | null;

  @ApiPropertyOptional()
  active: boolean | null;

  sub_category_order: number;

  created_at: string | null;

  updated_at: string | null;
}
