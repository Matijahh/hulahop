import { PartialType } from '@nestjs/swagger';
import { CreateOrderAddressesInput } from './create-order-addresses.input';

export class UpdateOrderAddressesInput extends PartialType(
  CreateOrderAddressesInput,
) {
  id: number;
}
