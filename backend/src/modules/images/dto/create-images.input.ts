import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateImagesInput {
  id: string;

  @ApiProperty()
  @MaxLength(256)
  name: string | null;

  @ApiProperty()
  @MaxLength(256)
  original_name: string | null;

  created_at: string | null;
  updated_at?: string | null;
}