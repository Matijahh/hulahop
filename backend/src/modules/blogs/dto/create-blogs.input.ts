import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateBlogsInput {
  @ApiProperty()
  image_id: string | null;

  @ApiProperty()
  @MaxLength(100)
  heading: string | null;

  @ApiProperty()
  @MaxLength(100)
  category_name: string | null;

  @ApiProperty()
  content: string | null;

  created_at: string | null;

  updated_at: string | null;

  created_by: number | null;
}
