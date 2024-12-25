import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoriesInput } from './dto/create-sub-categories.input';
import { UpdateSubCategoriesInput } from './dto/update-sub-categories.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { SkipAuth } from '../../core/guards/auth-guard';

@ApiTags('sub_categories')
@ApiBearerAuth()
@Controller('sub_categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @ApiBody({ type: CreateSubCategoriesInput })
  @Post()
  async createSubCategories(
    @Res() res: Response,
    @Body() createSubCategoriesInput: CreateSubCategoriesInput,
  ) {
    const result = await this.subCategoriesService.createSubCategories(
      createSubCategoriesInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sub-categories created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAllSubCategories(@Res() res: Response) {
    const result = await this.subCategoriesService.findAllSubCategories();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sub-categories retrieved successfully',
    );
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.subCategoriesService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sub-categories retrieved successfully',
    );
  }

  @SkipAuth()
  @Get('category/:id')
  async findByCategoryId(@Res() res: Response, @Param('id') id: string) {
    const result = await this.subCategoriesService.find({
      where: {
        category: {
          id,
        },
      },
      order: {
        sub_category_order: 'ASC',
      },
    });

    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sub-categories retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateSubCategoriesInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() updateSubCategoriesInput: UpdateSubCategoriesInput,
  ) {
    const result = await this.subCategoriesService.update(id, {
      ...updateSubCategoriesInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sub-categories updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number) {
    const result = await this.subCategoriesService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sub-categories deleted successfully',
    );
  }
}
