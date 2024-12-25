import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSessionInput {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  refresh_token: string | null;

  created?: number | null;
}
