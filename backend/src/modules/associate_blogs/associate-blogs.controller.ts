import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AssociateBlogsService } from './associate-blogs.service';
import { CreateAssociateBlogsInput } from './dto/create-associate-blog.input';
import { Response } from 'express';
import { CurrentUser } from 'src/commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { baseController } from 'src/core/baseController';
import { SkipAuth } from 'src/core/guards/auth-guard';
import { UpdateAssociateBlogsInput } from './dto/update-associate-blog.input';

@ApiTags('associate-blogs')
@ApiBearerAuth()
@Controller('associate_blogs')
export class AssociateBlogsController {
  constructor(private readonly associateBlogsService: AssociateBlogsService) {}

  @ApiBody({ type: CreateAssociateBlogsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createAssociateBlogsInput: CreateAssociateBlogsInput,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    createAssociateBlogsInput.created_by = currentUser.id;
    const result = await this.associateBlogsService.create(
      createAssociateBlogsInput,
      currentUser.id,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blogs created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAllAssociateBlogs(@Res() res: Response) {
    const blogs = await this.associateBlogsService.find({
      where: { show_on_main: true },
      relations: ['store', "created_by2"],
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      blogs,
      'Blogs fetched successfully',
    );
  }

  @SkipAuth()
  @Get('store/:store_id')
  async findAll(
    @Res() res: Response,
    @Param('store_id', ParseIntPipe) store_id: number,
  ) {
    const result = await this.associateBlogsService.find({
      where: { store: { id: store_id } },
      relations: ['store', 'created_by2'],
    });

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
    const result = await this.associateBlogsService.findOne({ where: { id }, 
      relations: ['store', 'created_by2'],},);
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

  @ApiBody({ type: UpdateAssociateBlogsInput })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body() updateAssociateBlogsInput: UpdateAssociateBlogsInput,
  ) {
    const result = await this.associateBlogsService.update(id, {
      id,
      ...updateAssociateBlogsInput,
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
    const result = await this.associateBlogsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Blogs deleted successfully',
    );
  }
}
