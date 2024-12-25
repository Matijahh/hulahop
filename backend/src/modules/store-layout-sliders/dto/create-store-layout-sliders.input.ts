import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateStoreLayoutSlidersInput {
  store_id: number | null;

  @ApiProperty()
  @MaxLength(100)
  name: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  image_id: string | null;
}
