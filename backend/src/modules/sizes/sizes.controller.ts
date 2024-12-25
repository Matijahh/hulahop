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
import { SizesService } from './sizes.service';
import { CreateSizesInput } from './dto/create-sizes.input';
import { UpdateSizesInput } from './dto/update-sizes.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
@ApiTags('sizes')
@ApiBearerAuth()
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @ApiBody({ type: CreateSizesInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createSizesInput: CreateSizesInput,
  ) {
    const result = await this.sizesService.create(createSizesInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sizes created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.sizesService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sizes fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.sizesService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sizes fetched successfully',
    );
  }

  @ApiBody({ type: UpdateSizesInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSizesInput: UpdateSizesInput,
  ) {
    const result = await this.sizesService.update(id, updateSizesInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sizes updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.sizesService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Sizes deleted successfully',
    );
  }
}
