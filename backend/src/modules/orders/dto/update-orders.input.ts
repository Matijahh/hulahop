import { PartialType } from '@nestjs/swagger';
import { CreateOrdersInput } from './create-orders.input';

export class UpdateOrdersInput extends PartialType(CreateOrdersInput) {
  id: number;
}
