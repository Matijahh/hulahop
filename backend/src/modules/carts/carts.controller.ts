import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CartsService } from './carts.service';
import { CurrentUser } from '../../commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { baseController } from '../../core/baseController';

@ApiTags('carts')
@ApiBearerAuth()
@Controller('carts')
export class CartProductsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('get-cart-summary')
  async getcarts(@CurrentUser() user: CurrentUserDto, @Res() res: Response) {
    const result = await this.cartsService.findOne({
      where: { user_id: user.id },
      relations: {
        cart_products: {
          associate_product: {
            product: true,
          },
          product_variant: true,
          product_sub_variant: true,
        },
      },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Cart retrieved successfully',
    );
  }

  @Delete('remove-cart')
  async removeCart(@CurrentUser() user: CurrentUserDto, @Res() res: Response) {
    const result = await this.cartsService.removeCart(user.id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Remove cart successfully',
    );
  }
}
