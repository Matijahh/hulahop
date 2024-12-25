import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateInquiriesInput } from './create-inquiries.input';

export class UpdateInquiriesInput extends PartialType(CreateInquiriesInput) {
  id: number;
}
