import { ApiProperty } from '@nestjs/swagger';

export class AuthUser {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
