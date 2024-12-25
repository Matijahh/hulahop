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
  NotFoundException,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementsInput } from './dto/create-announcements.input';
import { UpdateAnnouncementsInput } from './dto/update-announcements.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';

@ApiTags('announcements')
@ApiBearerAuth()
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @ApiBody({ type: CreateAnnouncementsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createAnnouncementsInput: CreateAnnouncementsInput,
  ) {
    const result = await this.announcementsService.create(
      createAnnouncementsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Announcement created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.announcementsService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Announcement retrieved successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.announcementsService.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('This record does not exist!');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Announcement retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateAnnouncementsInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnnouncementsInput: UpdateAnnouncementsInput,
  ) {
    const result = await this.announcementsService.update(id, {
      ...updateAnnouncementsInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Announcement updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.announcementsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Announcement deleted successfully',
    );
  }
}
