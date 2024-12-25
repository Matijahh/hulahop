import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductSubVariantsService } from './product-sub-variants.service';
import { CreateProductSubVariantsInput } from './dto/create-product-sub-variants.input';
import { UpdateProductSubVariantsInput } from './dto/update-product-sub-variants.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/core/guards/auth-guard';

@ApiTags('product_sub_variants')
@ApiBasicAuth()
@Controller('product_sub_variants')
export class ProductSubVariantsController {
  constructor(
    private readonly productSubVariantsService: ProductSubVariantsService,
  ) {}

  @ApiBody({ type: CreateProductSubVariantsInput })
  @Post()
  create(@Body() createProductSubVariantsInput: CreateProductSubVariantsInput) {
    return this.productSubVariantsService.create(createProductSubVariantsInput);
  }

  @Get()
  findAll() {
    return this.productSubVariantsService.find();
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSubVariantsService.findOne({ where: { id } });
  }

  @ApiBody({ type: UpdateProductSubVariantsInput })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductSubVariantsInput: UpdateProductSubVariantsInput,
  ) {
    return this.productSubVariantsService.update(
      id,
      updateProductSubVariantsInput,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productSubVariantsService.remove(id);
  }
}
