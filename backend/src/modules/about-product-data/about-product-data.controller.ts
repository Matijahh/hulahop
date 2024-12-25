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
  NotFoundException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AboutProductDataService } from './about-product-data.service';
import { CreateAboutProductDataInput } from './dto/create-about-product-data.dto';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateAboutProductDataInput } from './dto/update-about-product-data.dto';
import { SkipAuth } from 'src/core/guards/auth-guard';
import { GetAboutProductFilterInputDto } from './dto/get-about-product-filter-input.dto';

@ApiTags('about_product_data')
@ApiBearerAuth()
@Controller('about-product-data')
export class AboutProductDataController {
  constructor(
    private readonly aboutProductDataService: AboutProductDataService,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createAboutProductDataInput: CreateAboutProductDataInput,
  ) {
    const result = await this.aboutProductDataService.create(
      createAboutProductDataInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About product data created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(
    @Res() res: Response,
    @Query() filterDto: GetAboutProductFilterInputDto,
  ) {
    const result = await this.aboutProductDataService.find({
      where: { subcategory_id: filterDto.subcategory_id },
      relations: {
        category: true,
        sub_category: true,
        about_product_size_chart_image: true,
        about_product_top_bar_image: true,
        about_product_bottom_bar_images: true,
      },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About product data fetched successfully',
    );
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.aboutProductDataService.findOne({
      where: { id },
      relations: {
        category: true,
        sub_category: true,
        about_product_size_chart_image: true,
        about_product_top_bar_image: true,
        about_product_bottom_bar_images: true,
      },
    });
    if (!result) {
      throw new NotFoundException('This record does not exist!');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About product data fetched successfully',
    );
  }

  @ApiBody({ type: UpdateAboutProductDataInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAboutProductDataInput: UpdateAboutProductDataInput,
  ) {
    const result = await this.aboutProductDataService.update(id, {
      id,
      ...updateAboutProductDataInput,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About product data updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.aboutProductDataService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About product data removed successfully',
    );
  }
}
