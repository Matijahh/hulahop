import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { Match } from '../../../commons';
import { passwordRegex } from '../../../commons/constant';
import { CreateUsersInput } from '../../users/dto/create-users.input';

export class SignupUserInput extends CreateUsersInput {
  @ApiProperty()
  @IsNotEmpty()
  @Match('password', { message: 'Password and confirm password do not match' })
  @Matches(passwordRegex, {
    message:
      'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
  })
  confirmPassword: string;
}
