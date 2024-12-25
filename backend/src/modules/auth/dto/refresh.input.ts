import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshToken {
  @ApiProperty()
  @IsNotEmpty()
  refresh_token: string;
}
