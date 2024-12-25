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
import { WishListService } from './wish-list.service';
import { CreateWishListInput } from './dto/create-wish-list.input';
import { UpdateWishListInput } from './dto/update-wish-list.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { CurrentUser } from 'src/commons';

@ApiTags('wishlist')
@ApiBearerAuth()
@Controller('wishlist')
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @ApiBody({ type: CreateWishListInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createWishListInput: CreateWishListInput,
    @CurrentUser() user: CurrentUserDto,
  ) {
    createWishListInput.user_id = user.id;
    const result = await this.wishListService.create(createWishListInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'WishList created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response, @CurrentUser() user: CurrentUserDto) {
    const result = await this.wishListService.find({
      where: { user_id: user.id },
      relations: { associate_product: true },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'WishList fetched successfully',
    );
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const result = await this.wishListService.findOne({
      where: { id, user_id: user.id },
      relations: { associate_product: true },
    });
    if (!result) {
      throw new NotFoundException('WishList not found');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'WishList fetched successfully',
    );
  }

  @ApiBody({ type: UpdateWishListInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWishListInput: UpdateWishListInput,
  ) {
    const result = await this.wishListService.update(id, updateWishListInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'WishList updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.wishListService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'WishList deleted successfully',
    );
  }
}
