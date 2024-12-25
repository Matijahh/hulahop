import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateShopSliderInput {
  @ApiProperty()
  @MaxLength(36)
  image_id: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  status: boolean | null;
}
