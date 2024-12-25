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
} from '@nestjs/common';
import { UserSessionService } from './user-session.service';
import { CreateUserSessionInput } from './dto/create-user-session.input';
import { UpdateUserSessionInput } from './dto/update-user-session.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';
@ApiTags('user_session')
@ApiBearerAuth()
@Controller('user_session')
export class UserSessionController {
  constructor(private readonly userSessionService: UserSessionService) {}

  @ApiBody({ type: CreateUserSessionInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createUserSessionInput: CreateUserSessionInput,
  ) {
    const result = await this.userSessionService.create(createUserSessionInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User session created successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.userSessionService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User session fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.userSessionService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User session fetched successfully',
    );
  }

  @ApiBody({ type: UpdateUserSessionInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserSessionInput: UpdateUserSessionInput,
  ) {
    const result = await this.userSessionService.update(
      +id,
      updateUserSessionInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User session updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.userSessionService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'User session deleted successfully',
    );
  }
}
