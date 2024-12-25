import { PartialType } from '@nestjs/swagger';
import { CreateUserAddressesInput } from './create-user-addresses.input';

export class UpdateUserAddressesInput extends PartialType(
  CreateUserAddressesInput,
) {
  id: number;
}
