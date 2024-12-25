import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateAboutProductBottomBarImageInput {
  @ApiProperty()
  about_product_data_id: number;

  @ApiProperty()
  @MaxLength(36)
  bottom_bar_images_id: string | null;

  created_at: string | null;

  updated_at: string | null;
}
