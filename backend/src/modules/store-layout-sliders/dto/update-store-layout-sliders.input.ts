import { PartialType } from '@nestjs/swagger';
import { CreateStoreLayoutSlidersInput } from './create-store-layout-sliders.input';

export class UpdateStoreLayoutSlidersInput extends PartialType(
  CreateStoreLayoutSlidersInput,
) {
  id: number;
}
