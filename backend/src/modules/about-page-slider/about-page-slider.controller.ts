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
} from '@nestjs/common';
import { AboutPageSliderService } from './about-page-slider.service';
import { CreateAboutPageSliderInput } from './dto/create-about-page-slider.dto';
import { UpdateAboutPageSliderInput } from './dto/update-about-page-slider.dto';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../../core/guards/auth-guard';

@ApiTags('about_page_slider')
@ApiBearerAuth()
@Controller('about_page_slider')
export class AboutPageSliderController {
  constructor(
    private readonly aboutPageSliderService: AboutPageSliderService,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createAboutPageSliderDto: CreateAboutPageSliderInput,
  ) {
    const result = await this.aboutPageSliderService.create(
      createAboutPageSliderDto,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About page slider created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.aboutPageSliderService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About page slider fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.aboutPageSliderService.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('This record does not exist!');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About page slider fetched successfully',
    );
  }

  @ApiBody({ type: UpdateAboutPageSliderInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopSliderInput: UpdateAboutPageSliderInput,
  ) {
    const result = await this.aboutPageSliderService.update(id, {
      id,
      ...updateShopSliderInput,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About page slider updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.aboutPageSliderService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'About page slider removed successfully',
    );
  }
}
