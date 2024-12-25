import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateOrderAddressesInput {
  @ApiProperty()
  order_id: number | null;

  @ApiProperty()
  house_flat_no: string | null;

  @ApiPropertyOptional()
  street_locality: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  city: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  state: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  country: string | null;

  @ApiProperty()
  @MaxLength(100)
  pincode: string | null;

  created_at: string | null;

  updated_at: string | null;
}
