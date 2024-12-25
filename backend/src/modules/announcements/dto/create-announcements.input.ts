import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateAnnouncementsInput {
  @ApiProperty()
  @MaxLength(100)
  title: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty({ default: true })
  status: boolean | null;

  created_at: string | null;
  updated_at: string | null;
}
