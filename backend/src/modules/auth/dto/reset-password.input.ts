import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { passwordRegex } from '../../../commons/constant';
import { Match } from '../../../commons/decorator/match-validator.decorator';

export class ResetPasswordInput {
  @ApiProperty()
  @IsNotEmpty()
  token?: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Match('password', { message: 'Password and confirm password do not match' })
  @Matches(passwordRegex, {
    message:
      'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
  })
  confirmPassword: string;
}
