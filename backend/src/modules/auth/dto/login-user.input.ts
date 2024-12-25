import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginUserInput {
  @ApiProperty()
  @ValidateIf((o) => !o.mobile)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @ValidateIf((o) => !o.email)
  @MinLength(1)
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
