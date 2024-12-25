import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseIntPipe,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { OrderAddressesService } from './order-addresses.service';
import { CreateOrderAddressesInput } from './dto/create-order-addresses.input';
import { UpdateOrderAddressesInput } from './dto/update-order-addresses.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';

@ApiTags('order_addresses')
@ApiBearerAuth()
@Controller('order_addresses')
export class OrderAddressesController {
  constructor(private readonly orderAddressesService: OrderAddressesService) {}

  @ApiBody({ type: CreateOrderAddressesInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createOrderAddressesInput: CreateOrderAddressesInput,
  ) {
    const result = await this.orderAddressesService.create(
      createOrderAddressesInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order address created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.orderAddressesService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order address fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.orderAddressesService.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Order address not found');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order address fetched successfully',
    );
  }

  @ApiBody({ type: UpdateOrderAddressesInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderAddressesInput: UpdateOrderAddressesInput,
  ) {
    const result = await this.orderAddressesService.update(id, {
      id,
      ...updateOrderAddressesInput,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order address updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.orderAddressesService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Order address deleted successfully',
    );
  }
}
