import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
