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
  NotFoundException,
  Query,
} from '@nestjs/common';
import { StoreLayoutDetailsService } from './store-layout-details.service';
import { CreateStoreLayoutDetailsInput } from './dto/create-store-layout-details.input';
import { UpdateStoreLayoutDetailsInput } from './dto/update-store-layout-details.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { SkipAuth } from '../../core/guards/auth-guard';

@ApiTags('store_layout_details')
@ApiBearerAuth()
@Controller('store_layout_details')
export class StoreLayoutDetailsController {
  constructor(
    private readonly storeLayoutDetailsService: StoreLayoutDetailsService,
  ) {}

  @ApiBody({ type: CreateStoreLayoutDetailsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createStoreLayoutDetailsInput: CreateStoreLayoutDetailsInput,
  ) {
    const result = await this.storeLayoutDetailsService.create(
      createStoreLayoutDetailsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Store layout details created successfully',
    );
  }
  
  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.storeLayoutDetailsService.find({
      relations: { store_layout_sliders: true },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Store layout details fetched successfully',
    );
  }
  
  @SkipAuth()
  @Get('search')
  async findOneByName(@Res() res: Response, @Query('name') name: string) {
    const trimmedName = name.trim();
    console.log(trimmedName);
    const result = await this.storeLayoutDetailsService.findOne({
      where: { name: trimmedName },
      relations: { store_layout_sliders: true },
    });
    
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Store layout details fetched successfully',
    );
  }

  @SkipAuth()
  @Get(':user_id')
  async findOne(@Res() res: Response, @Param('user_id') user_id: string) {
    const result = await this.storeLayoutDetailsService.findOne({
      where: { user_id },
      relations: { store_layout_sliders: true },
    });
    if (!result) {
      throw new NotFoundException('This record does not exist!');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Store layout details fetched successfully',
    );
  }


  @SkipAuth()
  @Get('slug/:slug')
  async findOneBySlug(@Res() res: Response, @Param('slug') slug: string) {
    const result = await this.storeLayoutDetailsService.findOne({
      where: { slug },
      relations: { store_layout_sliders: true },
    });
    if (!result) {
      throw new NotFoundException('This record does not exist!');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Store layout details fetched successfully',
    );
  }

  @ApiBody({ type: UpdateStoreLayoutDetailsInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreLayoutDetailsInput: UpdateStoreLayoutDetailsInput,
  ) {
    const result = await this.storeLayoutDetailsService.update(
      id,
      updateStoreLayoutDetailsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Store layout details updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.storeLayoutDetailsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Store layout details deleted successfully',
    );
  }
}
