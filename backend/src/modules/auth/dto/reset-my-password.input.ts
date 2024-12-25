import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { Match } from '../../../commons';
import { passwordRegex } from '../../../commons/constant';


export class ResetMyPasswordInput {
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
