import { PartialType } from '@nestjs/swagger';
import { CreateAssociateWithdrawnRequestInput } from './create-associate-withdrawn-request.input';

export class UpdateAssociateWithdrawnRequestInput extends PartialType(
  CreateAssociateWithdrawnRequestInput,
) {
  id: number;
}
