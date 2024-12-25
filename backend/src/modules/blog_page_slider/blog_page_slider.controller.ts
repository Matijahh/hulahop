import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { BlogPageSliderService } from './blog_page_slider.service';
import { CreateBlogPageSliderInput } from './dto/create_blog_page_slider.dto';
import { baseController } from 'src/core/baseController';
import { SkipAuth } from 'src/core/guards/auth-guard';
import { Response } from 'express';
import { UpdateBlogPageSliderInput } from './dto/update_blog_page_slider.dto';

@ApiTags('blog_page_slider')
@ApiBearerAuth()
@Controller('blog_page_slider')
export class BlogPageSliderController {
  constructor(private readonly blogPageSliderService: BlogPageSliderService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createBlogPageSliderDto: CreateBlogPageSliderInput,
  ) {
    const result = await this.blogPageSliderService.create(
      createBlogPageSliderDto,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blog page slider created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.blogPageSliderService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blog page slider fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.blogPageSliderService.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('This record does not exist!');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blog page slider fetched successfully',
    );
  }

  @ApiBody({ type: UpdateBlogPageSliderInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogSliderInput: UpdateBlogPageSliderInput,
  ) {
    const result = await this.blogPageSliderService.update(id, {
      id,
      ...updateBlogSliderInput,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blog page slider updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.blogPageSliderService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blog page slider removed successfully',
    );
  }
}
