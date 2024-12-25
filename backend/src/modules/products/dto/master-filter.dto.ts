import { ApiPropertyOptional } from '@nestjs/swagger';

export class masterFilterInputDto {
  @ApiPropertyOptional()
  search_string: string | null;
}
