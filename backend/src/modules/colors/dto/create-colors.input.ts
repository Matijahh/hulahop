import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateColorsInput {
  @ApiProperty()
  @MaxLength(50)
  name: string | null;

  @ApiProperty()
  @MaxLength(50)
  code: string | null;

  @ApiProperty()
  status: boolean | null;
}
