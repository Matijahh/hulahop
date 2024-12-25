import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAssociateProductFilterInputDto {
  @ApiPropertyOptional({ type: [Number] })
  category_ids: number[];

  @ApiPropertyOptional({ type: [Number] })
  sub_category_ids: number[];

  @ApiPropertyOptional()
  search_string: string | null;

  @ApiPropertyOptional()
  user_id: number | null;

  @ApiPropertyOptional()
  price_low_to_high: string | null;

  @ApiPropertyOptional()
  date_added: string | null;

  @ApiPropertyOptional()
  best_selling: string | null;

  @ApiPropertyOptional()
  associate_highlighted: string | null;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  page?: number;
}
