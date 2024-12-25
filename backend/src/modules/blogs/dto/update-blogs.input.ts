import { PartialType } from '@nestjs/swagger';
import { CreateBlogsInput } from './create-blogs.input';

export class UpdateBlogsInput extends PartialType(CreateBlogsInput) {
  id: number;
}
