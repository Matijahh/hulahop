import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAboutProductFilterInputDto {
  @ApiPropertyOptional()
  subcategory_id: number | null;
}
