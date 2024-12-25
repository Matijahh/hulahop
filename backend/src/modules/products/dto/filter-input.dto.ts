import { ApiPropertyOptional } from '@nestjs/swagger';

export class filterInputDto {
  @ApiPropertyOptional()
  category_id: number | null;

  @ApiPropertyOptional()
  subcategory_id: number | null;

  @ApiPropertyOptional()
  search_string: string | null;
}
