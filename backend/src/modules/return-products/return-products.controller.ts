import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ReturnProductsService } from './return-products.service';
import { CreateReturnProductsInput } from './dto/create-return-products.input';
import { UpdateReturnProductsInput } from './dto/update-return-products.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';

@ApiTags('return_products')
@ApiBearerAuth()
@Controller('return_products')
export class ReturnProductsController {
  constructor(private readonly returnProductsService: ReturnProductsService) {}

  @ApiBody({ type: CreateReturnProductsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createReturnProductsInput: CreateReturnProductsInput,
  ) {
    const result = await this.returnProductsService.create(
      createReturnProductsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Return Product created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.returnProductsService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Return Product retrieved successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.returnProductsService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Return Product retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateReturnProductsInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReturnProductsInput: UpdateReturnProductsInput,
  ) {
    const result = await this.returnProductsService.update(id, {
      ...updateReturnProductsInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Return Product updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.returnProductsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Return Product deleted successfully',
    );
  }
}
