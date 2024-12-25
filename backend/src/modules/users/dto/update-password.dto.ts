import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/commons';

export class UpdatePasswordInput {
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  old_password: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  retype_password: string;
}
