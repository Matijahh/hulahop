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
} from '@nestjs/common';
import { ShopSliderService } from './shop-slider.service';
import { CreateShopSliderInput } from './dto/create-shop-slider.input';
import { UpdateShopSliderInput } from './dto/update-shop-slider.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';
import { SkipAuth } from '../../core/guards/auth-guard';

@ApiTags('shop_slider')
@ApiBearerAuth()
@Controller('shop_slider')
export class ShopSliderController {
  constructor(private readonly shopSliderService: ShopSliderService) {}

  @ApiBody({ type: CreateShopSliderInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createShopSliderInput: CreateShopSliderInput,
  ) {
    const result = await this.shopSliderService.create(createShopSliderInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Shop slider created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.shopSliderService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Shop sliders fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.shopSliderService.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('This record does not exist!');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Shop slider fetched successfully',
    );
  }

  @ApiBody({ type: UpdateShopSliderInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopSliderInput: UpdateShopSliderInput,
  ) {
    const result = await this.shopSliderService.update(id, {
      id,
      ...updateShopSliderInput,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Shop slider updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.shopSliderService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Shop slider removed successfully',
    );
  }
}
