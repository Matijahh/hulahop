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
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesInput } from './dto/create-categories.input';
import { UpdateCategoriesInput } from './dto/update-categories.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { SkipAuth } from '../../core/guards/auth-guard';
import { AssociateProductsService } from '../associate-products/associate-products.service';
import { log } from 'console';
import { UpdateCategoriesOrder } from './dto/update-categories-order';
@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService, private readonly associateProductsService: AssociateProductsService) {}

  @ApiBody({ type: CreateCategoriesInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createCategoriesInput: CreateCategoriesInput,
  ) {
    const result = await this.categoriesService.create(createCategoriesInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(@Res() res: Response, @Query("user_id") user_id: number) {
    
    // const categoryIds = [3, 4];
    // const subCategoryIds = [4, 5];
    let result = await this.categoriesService.find({
      relations: { sub_categories: true },
      order: {
        category_order: 'ASC',
        sub_categories: {
          sub_category_order: 'ASC',
        },
      },
    });
    
    if(user_id){
      const { categoryIds, subCategoryIds } = await this.associateProductsService.getCategoryAndSubCategoryIds(user_id);
      
      result = result.filter((category) => {
        if(categoryIds.includes(category.id)){
          category.sub_categories = category.sub_categories.filter((subsCategory: { id: number}) => {
            return subCategoryIds.includes(subsCategory.id);
          });
          return true;
        }
        return false;
      });
    }

    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories retrieved successfully',
    );
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.categoriesService.findOne({
      where: { id },
      relations: { sub_categories: true },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateCategoriesInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriesInput: UpdateCategoriesInput,
  ) {
    const result = await this.categoriesService.update(id, {
      ...updateCategoriesInput,
      id,
    },
  );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories updated successfully',
    );
  }

  @ApiBody({ type: UpdateCategoriesOrder })
  @Patch('order/:id')
  async updateOrder(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriesOrder: UpdateCategoriesOrder,
  ) {
    const result = await this.categoriesService.updateOrder(id, updateCategoriesOrder);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories order updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.categoriesService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories deleted successfully',
    );
  }
}
