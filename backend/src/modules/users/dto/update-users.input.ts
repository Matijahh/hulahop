import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsersInput } from './create-users.input';

export class UpdateUsersInput extends PartialType(CreateUsersInput) {
  id: number;
}
