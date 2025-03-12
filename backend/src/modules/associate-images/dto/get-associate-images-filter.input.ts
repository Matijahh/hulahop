import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAssociateImagesFilterInputDto {

  @ApiPropertyOptional()
  image_name?: string;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  page?: number;
}
