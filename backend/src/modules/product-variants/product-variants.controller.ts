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
} from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantsInput } from './dto/create-product-variants.input';
import { UpdateProductVariantsInput } from './dto/update-product-variants.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { SkipAuth } from 'src/core/guards/auth-guard';

@ApiTags('product_variants')
@ApiBearerAuth()
@Controller('product_variants')
export class ProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @ApiBody({ type: CreateProductVariantsInput })
  @Post()
  async createProductVariant(
    @Res() res: Response,
    @Body() createProductVariantsInput: CreateProductVariantsInput,
  ) {
    const result = await this.productVariantsService.createProductVariant(
      createProductVariantsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product variant created successfully',
    );
  }

  @Get()
  async findAllProductVariants(@Res() res: Response) {
    const result = await this.productVariantsService.find({
      order: { id: 'ASC' },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product variant retrieved successfully',
    );
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.productVariantsService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product variant retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateProductVariantsInput })
  @Patch(':id')
  async updateProductVariant(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductVariantsInput: UpdateProductVariantsInput,
  ) {
    const result = await this.productVariantsService.updateProductVariant(id, {
      ...updateProductVariantsInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product variant updated successfully',
    );
  }

  @Delete(':id')
  async removeProductVariant(@Res() res: Response, @Param('id') id: number) {
    const result = await this.productVariantsService.removeProductVariant(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product variant deleted successfully',
    );
  }
}
