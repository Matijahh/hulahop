import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsOptional, MaxLength, ValidateNested } from 'class-validator';
import { ORDER_STATUS } from 'src/commons/constant';
import { IsNull } from 'typeorm';

export class BaseClass {
  created_at: string | null;
  updated_at: string | null;
}

export class CreateOrderProduct extends BaseClass {
  order_id: number | null;

  @ApiProperty()
  associate_product_id: number | null;

  @ApiProperty()
  quantity: number | null;
}

export class CreateOrderAddress extends BaseClass {
  order_id: number | null;

  @ApiPropertyOptional()
  @MaxLength(50)
  first_name: string | null;

  @ApiPropertyOptional()
  @MaxLength(50)
  last_name: string | null;

  @ApiPropertyOptional()
  @MaxLength(70)
  email: string | null;

  @ApiPropertyOptional()
  @MaxLength(50)
  mobile: string | null;

  @ApiPropertyOptional()
  house_flat_no: string | null;

  @ApiPropertyOptional()
  street_locality: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  city: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  @IsOptional()
  state: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  country: string | null;

  @ApiPropertyOptional()
  @MaxLength(100)
  pincode: string | null;
}

export class CreateOrdersInput extends BaseClass {
  sku: string | null;

  @ApiProperty({ default: 'PENDING' })
  status: 'PENDING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';

  @ApiPropertyOptional()
  instructions: string | null;

  @ApiProperty({ type: CreateOrderAddress })
  @Type(() => CreateOrderAddress)
  @ValidateNested({ each: true })
  order_addresses: CreateOrderAddress;
}

export class UpdateOrderStatusInput {
  @ApiProperty({ enum: ORDER_STATUS, default: ORDER_STATUS.PENDING })
  @IsIn(Object.values(ORDER_STATUS), {
    message: (args) => `${args.value} is not a valid order status`,
  })
  status: ORDER_STATUS;
}
