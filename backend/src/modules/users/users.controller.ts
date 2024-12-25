import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  HttpStatus,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BecomeSellerInput, CreateUsersInput } from './dto/create-users.input';
import { UpdateUsersInput } from './dto/update-users.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response, Request } from 'express';
import { UpdatePasswordInput } from './dto/update-password.dto';
import { CurrentUser } from 'src/commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUsersInput })
  // @Post()
  async create(
    @Body() createUsersInput: CreateUsersInput,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const result = await this.usersService.create(createUsersInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request) {
    const result = await this.usersService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User fetched successfully',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.usersService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User fetched successfully',
    );
  }

  @ApiBody({ type: UpdateUsersInput })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsersInput: UpdateUsersInput,
    @Res() res: Response,
  ) {
    const result = await this.usersService.update(+id, {
      ...updateUsersInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.remove(+id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User remove successfully',
    );
  }

  @Put('/update-password')
  async updatePassword(
    @Body() updateUserPasswordInput: UpdatePasswordInput,
    @Res() res: Response,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    const result = await this.usersService.updateUserPassword(currentUser.id, {
      id: currentUser.id,
      ...updateUserPasswordInput,
    });
    return baseController.getResult(
      res,
      200,
      result,
      'Password Change Successfully',
    );
  }

  @Put('/become-seller')
  async becomeSeller(
    @Res() res: Response,
    @Body() becomeSellerInput: BecomeSellerInput,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    const result = await this.usersService.becomeSeller(
      becomeSellerInput,
      currentUser.id,
    );
    return baseController.getResult(
      res,
      200,
      result,
      'User become seller successfully',
    );
  }
}
