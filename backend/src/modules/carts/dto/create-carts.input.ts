import { ApiProperty } from '@nestjs/swagger';

export class CreateCartsInput {
  @ApiProperty()
  user_id: number;
}
