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
} from '@nestjs/common';
import { AboutProductBottomBarImageService } from './about-product-bottom-bar-image.service';
import { CreateAboutProductBottomBarImageInput } from './dto/create-about-product-bottom-bar-image.input';
import { UpdateAboutProductBottomBarImageInput } from './dto/update-about-product-bottom-bar-image.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';

@ApiTags('about_product_bottom_bar_image')
@ApiBearerAuth()
@Controller('about_product_bottom_bar_image')
export class AboutProductBottomBarImageController {
  constructor(
    private readonly aboutProductBottomBarImageService: AboutProductBottomBarImageService,
  ) {}

  @ApiBody({ type: CreateAboutProductBottomBarImageInput })
  @Post()
  async create(
    @Body()
    createAboutProductBottomBarImageInput: CreateAboutProductBottomBarImageInput,
    @Res() res: Response,
  ) {
    const result = await this.aboutProductBottomBarImageService.create(
      createAboutProductBottomBarImageInput,
    );
    return baseController.getResult(
      res,
      200,
      result,
      'About product bottom bar image created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.aboutProductBottomBarImageService.find();
    return baseController.getResult(
      res,
      200,
      result,
      'About product bottom bar image fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.aboutProductBottomBarImageService.findOne({
      where: { id },
    });
    return baseController.getResult(
      res,
      200,
      result,
      'About product bottom bar image fetched successfully',
    );
  }

  @ApiBody({ type: UpdateAboutProductBottomBarImageInput })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body()
    updateAboutProductBottomBarImageInput: UpdateAboutProductBottomBarImageInput,
  ) {
    const result = await this.aboutProductBottomBarImageService.update(id, {
      ...updateAboutProductBottomBarImageInput,
      id,
    });
    return baseController.getResult(
      res,
      200,
      result,
      'About product bottom bar image updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.aboutProductBottomBarImageService.remove(id);
    return baseController.getResult(
      res,
      200,
      result,
      'About product bottom bar image deleted successfully',
    );
  }
}
