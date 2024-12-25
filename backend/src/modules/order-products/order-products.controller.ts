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
} from '@nestjs/common';
import { OrderProductsService } from './order-products.service';
import { CreateOrderProductsInput } from './dto/create-order-products.input';
import { UpdateOrderProductsInput } from './dto/update-order-products.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';

@ApiTags('order_products')
@ApiBearerAuth()
@Controller('order_products')
export class OrderProductsController {
  constructor(private readonly orderProductsService: OrderProductsService) {}

  @ApiBody({ type: CreateOrderProductsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createOrderProductsInput: CreateOrderProductsInput,
  ) {
    const result = await this.orderProductsService.create(
      createOrderProductsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order-product created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.orderProductsService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order-product fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.orderProductsService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order-product fetched successfully',
    );
  }

  @ApiBody({ type: UpdateOrderProductsInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderProductsInput: UpdateOrderProductsInput,
  ) {
    const result = await this.orderProductsService.update(id, {
      ...updateOrderProductsInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order-product updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.orderProductsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order-product deleted successfully',
    );
  }
}
