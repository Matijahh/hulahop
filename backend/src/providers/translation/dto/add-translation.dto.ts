import { ApiProperty } from '@nestjs/swagger';

export class AddTranslationsInput {
  @ApiProperty()
  en: string;

  @ApiProperty()
  sb: string;
}
