import { ApiProperty } from '@nestjs/swagger';

export class CreateAssociateImagesInput {
  user_id: number | null;

  @ApiProperty()
  image_id: string | null;
}
