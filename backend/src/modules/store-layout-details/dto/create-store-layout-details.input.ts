import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateStoreLayoutDetailsInput {
  @ApiProperty()
  user_id: number | null;

  @ApiProperty()
  @MaxLength(100)
  name: string | null;

  @ApiProperty()
  logo_image: string | null;

  @ApiProperty()
  description: string | null;

  @ApiPropertyOptional()
  social_links: any;

  @ApiPropertyOptional()
  slider_name: string | null;

  @ApiPropertyOptional()
  slider_description: string | null;

  @ApiPropertyOptional()
  slider_image: string | null;
}
