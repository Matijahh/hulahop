import { ApiProperty } from '@nestjs/swagger';

export class CreateAssociateWithdrawnRequestInput {
  @ApiProperty()
  user_id: number | null;

  @ApiProperty()
  amount: string | null;

  @ApiProperty({
    enum: ['PENDING', 'CANCELLED', 'COMPLETED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'CANCELLED' | 'COMPLETED';

  created_at: string | null;
  updated_at: string | null;
}
