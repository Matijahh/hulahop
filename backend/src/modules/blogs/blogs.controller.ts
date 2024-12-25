import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogsInput } from './dto/create-blogs.input';
import { UpdateBlogsInput } from './dto/update-blogs.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { CurrentUser } from 'src/commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { SkipAuth } from '../../core/guards/auth-guard';

@ApiTags('blogs')
@ApiBearerAuth()
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiBody({ type: CreateBlogsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createBlogsInput: CreateBlogsInput,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    createBlogsInput.created_by = currentUser.id;
    const result = await this.blogsService.create(createBlogsInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blogs created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.blogsService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blogs fetched successfully',
    );
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.blogsService.findOne({ where: { id } });
    if (!result) {
      return baseController.getResult(
        res,
        HttpStatus.NOT_FOUND,
        result,
        'Blogs not found',
      );
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blogs fetched successfully',
    );
  }

  @ApiBody({ type: UpdateBlogsInput })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body() updateBlogsInput: UpdateBlogsInput,
  ) {
    const result = await this.blogsService.update(id, {
      id,
      ...updateBlogsInput,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blogs updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.blogsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blogs deleted successfully',
    );
  }
}
