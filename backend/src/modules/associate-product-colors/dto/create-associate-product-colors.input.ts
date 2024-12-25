import { ApiProperty } from '@nestjs/swagger';

export class CreateAssociateProductColorsInput {
  @ApiProperty()
  associate_product_id: number | null;

  @ApiProperty()
  color_id: number | null;
}
