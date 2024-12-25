import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { CreateCartProductsInput } from './dto/create-cart-products.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@ApiTags('cart_products')
@ApiBearerAuth()
@Controller('cart_products')
export class CartProductsController {
  constructor(private readonly cartProductsService: CartProductsService) {}

  @ApiBody({ type: CreateCartProductsInput })
  @Post('add-to-cart')
  create(
    @Body() createCartProductsInput: CreateCartProductsInput,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.cartProductsService.create(createCartProductsInput, user.id);
  }
}
