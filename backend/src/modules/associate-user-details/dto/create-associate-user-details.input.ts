import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateAssociateUserDetailsInput {
  @ApiProperty()
  user_id: number | null;

  @ApiPropertyOptional()
  image_id: string | null;

  @ApiProperty()
  @MaxLength(100)
  heading: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  sub_heading: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  url: string | null;

  @ApiPropertyOptional()
  status: boolean | null;

  created_at: string | null;

  updated_at: string | null;
}
