import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateCategoriesInput {
  @ApiProperty()
  @MaxLength(64)
  name: string | null;

  @ApiProperty()
  description: string | null;

  @ApiPropertyOptional()
  image_id: string | null;

  @ApiPropertyOptional({ default: true })
  active: boolean | null;

  @ApiPropertyOptional({ default: false })
  is_top_selling: boolean | null;

  created_at: string | null;

  updated_at: string | null;
}
