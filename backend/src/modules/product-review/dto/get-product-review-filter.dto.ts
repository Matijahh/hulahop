import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProductFilterInputDto {
  @ApiPropertyOptional()
  associate_product_id: number;
}
