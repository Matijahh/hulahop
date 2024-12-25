import { PartialType } from '@nestjs/swagger';
import { CreateAssociateUserDetailsInput } from './create-associate-user-details.input';

export class UpdateAssociateUserDetailsInput extends PartialType(
  CreateAssociateUserDetailsInput,
) {
  id: number;
}
