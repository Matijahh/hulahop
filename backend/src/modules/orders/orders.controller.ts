import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateOrdersInput,
  UpdateOrderStatusInput,
} from './dto/create-orders.input';
import { UpdateOrdersInput } from './dto/update-orders.input';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { CurrentUser } from '../../commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { FilterInputDto } from './dto/filter-dto-input';
import { SkipAuth } from 'src/core/guards/auth-guard';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBody({ type: CreateOrdersInput })
  @Post('order-place')
  async create(
    @Res() res: Response,
    @Body() createOrdersInput: CreateOrdersInput,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const result = await this.ordersService.create(createOrdersInput, user.id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order created successfully',
    );
  }

  @SkipAuth()
  @Post('order-place-guest')
  async createGuest(@Res() res: Response, @Body() data: any) {
    const result = await this.ordersService.createGuest(
      data.createOrdersInput,
      data.cart,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order created successfully',
    );
  }

  @Get()
  async findAll(
    @Query() query: FilterInputDto,
    @CurrentUser() currentUser: CurrentUserDto,
    @Res() res: Response,
  ) {
    const result = await this.ordersService.findAll(query, currentUser);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.ordersService.findOne({
      where: { id },
      relations: {
        order_products: {
          associate_product: {
            product: true,
            user: { store_layout_details: true },
            cover_image_color: true,
          },
          product_variant: true,
          product_sub_variant: true,
        },
        order_addresses: true,
      },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order fetched successfully',
    );
  }

  @ApiBody({ type: UpdateOrdersInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrdersInput: UpdateOrdersInput,
  ) {
    const result = await this.ordersService.update(id, {
      ...updateOrdersInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order updated successfully',
    );
  }

  @ApiProperty({ type: UpdateOrderStatusInput })
  @Patch(':id/status')
  async updateOrderStatus(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderStatusInput: UpdateOrderStatusInput,
  ) {
    const result = await this.ordersService.updateOrderStatus(
      id,
      updateOrderStatusInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order status updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.ordersService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order deleted successfully',
    );
  }
}
