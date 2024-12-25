import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { CreateUserAddressesInput } from './dto/create-user-addresses.input';
import { UpdateUserAddressesInput } from './dto/update-user-addresses.input';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';

@ApiTags('user_addresses')
@ApiBearerAuth()
@Controller('user_addresses')
export class UserAddressesController {
  constructor(private readonly userAddressesService: UserAddressesService) {}

  @ApiBody({ type: CreateUserAddressesInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createUserAddressesInput: CreateUserAddressesInput,
  ) {
    const result = await this.userAddressesService.create(
      createUserAddressesInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User address created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.userAddressesService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User address fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.userAddressesService.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('User address not found');
    }
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User address fetched successfully',
    );
  }

  @ApiBody({ type: UpdateUserAddressesInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserAddressesInput: UpdateUserAddressesInput,
  ) {
    const result = await this.userAddressesService.update(id, {
      id,
      ...updateUserAddressesInput,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User address updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.userAddressesService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User address deleted successfully',
    );
  }
}
