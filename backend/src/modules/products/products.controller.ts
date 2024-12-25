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
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsInput } from './dto/create-products.input';
import { UpdateProductsInput } from './dto/update-products.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { filterInputDto } from './dto/filter-input.dto';
import { masterFilterInputDto } from './dto/master-filter.dto';
import { SkipAuth } from 'src/core/guards/auth-guard';
@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @SkipAuth()
  @Get('master-search')
  async masterFilter(
    @Res() res: Response,
    @Query() query: masterFilterInputDto,
  ) {
    const result = await this.productsService.masterFilter(query);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product fetched successfully',
    );
  }

  @ApiBody({ type: CreateProductsInput })
  @Post()
  async createProduct(
    @Res() res: Response,
    @Body() createProductsInput: CreateProductsInput,
  ) {
    const result =
      await this.productsService.createProduct(createProductsInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product created successfully',
    );
  }

  @Get()
  async findAllProducts(@Res() res: Response, @Query() query: filterInputDto) {
    const result = await this.productsService.findAll(query);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product retrieved successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.productsService.findOne({
      where: { id },
      relations: {
        product_variants: {
          sub_variants: true,
          color: true,
        },
        category: true,
        sub_category: true,
      },
      order: { product_variants: { sub_variants: { id: 'ASC' } } },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateProductsInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductsInput: UpdateProductsInput,
  ) {
    const result = await this.productsService.update(id, {
      ...updateProductsInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number) {
    const result = await this.productsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Product deleted successfully',
    );
  }
}
