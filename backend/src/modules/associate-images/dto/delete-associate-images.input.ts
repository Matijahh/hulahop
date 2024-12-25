import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteAssociateImagesInput {
  @ApiProperty({ type: [Number] })
  @IsArray()
  ids: number[];
}
