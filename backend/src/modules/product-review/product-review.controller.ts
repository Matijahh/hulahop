import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { UpdateProductReviewInput } from './dto/update-product-review.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { baseController } from '../../core/baseController';
import { Response } from 'express';
import { GetProductFilterInputDto } from './dto/get-product-review-filter.dto';
import { SkipAuth } from '../../core/guards/auth-guard';

@ApiTags('product_review')
@ApiBasicAuth()
@Controller('product_review')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @ApiBody({ type: CreateProductReviewInput })
  @Post()
  create(
    @Body() createProductReviewInput: CreateProductReviewInput,
    @CurrentUser() user: CurrentUserDto,
    @Res() res: Response,
  ) {
    const result = this.productReviewService.create(
      createProductReviewInput,
      user.id,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Review created successfully',
    );
  }

  @Get()
  findAll(@Query() filterDto: GetProductFilterInputDto, @Res() res: Response) {
    const result = this.productReviewService.find({
      where: filterDto,
      relations: { associate_product: true },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Review fetch successfully',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const result = this.productReviewService.findOne({
      where: { id },
      relations: { associate_product: true },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Review fetch successfully',
    );
  }

  @ApiBody({ type: UpdateProductReviewInput })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductReviewInput: UpdateProductReviewInput,
    @Res() res: Response,
  ) {
    const result = this.productReviewService.update(
      +id,
      updateProductReviewInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Review update successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.productReviewService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Review deleted successfully',
    );
  }
}
