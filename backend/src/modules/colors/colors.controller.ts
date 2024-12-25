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
  HttpStatus,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorsInput } from './dto/create-colors.input';
import { UpdateColorsInput } from './dto/update-colors.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';

@ApiTags('colors')
@ApiBearerAuth()
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @ApiBody({ type: CreateColorsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createColorsInput: CreateColorsInput,
  ) {
    const result = await this.colorsService.create(createColorsInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Color created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.colorsService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Color retrieved successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.colorsService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Color retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateColorsInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColorsInput: UpdateColorsInput,
  ) {
    const result = await this.colorsService.update(id, updateColorsInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Color updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.colorsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Color deleted successfully',
    );
  }
}
