import { PartialType } from '@nestjs/swagger';
import { CreateAssociateBlogsInput } from './create-associate-blog.input';

export class UpdateAssociateBlogsInput extends PartialType(
  CreateAssociateBlogsInput,
) {
  id: number;
}
