import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAnnouncementsInput } from './create-announcements.input';

export class UpdateAnnouncementsInput extends PartialType(
  CreateAnnouncementsInput,
) {
  id: number;
}
