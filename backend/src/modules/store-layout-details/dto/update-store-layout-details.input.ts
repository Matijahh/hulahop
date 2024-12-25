import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStoreLayoutDetailsInput } from './create-store-layout-details.input';

export class UpdateStoreLayoutDetailsInput extends PartialType(
  CreateStoreLayoutDetailsInput,
) {
  id: number;
}
