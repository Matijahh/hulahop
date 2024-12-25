import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ActionType } from '../../../commons/enum';

export class CreateCartProductsInput {
  @ApiPropertyOptional()
  associate_product_id: number | null;

  @ApiPropertyOptional()
  product_variant_id: number | null;

  @ApiPropertyOptional()
  product_sub_variant_id: number;

  @ApiProperty({ enum: ActionType })
  @IsEnum(ActionType)
  action_type:
    | 'add_to_cart'
    | 'add_qty'
    | 'remove_qty'
    | 'remove'
    | 'remove_product';

  @ApiPropertyOptional()
  quantity: number | null;
}
