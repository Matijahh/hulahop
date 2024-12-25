import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseArrayPipe,
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AssociateImagesService } from './associate-images.service';
import { CreateAssociateImagesInput } from './dto/create-associate-images.input';
import { UpdateAssociateImagesInput } from './dto/update-associate-images.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/commons';
import { UserSession } from '../user-session/entities/user-session.entity';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { DeleteAssociateImagesInput } from './dto/delete-associate-images.input';

@ApiTags('associate_images')
@ApiBearerAuth()
@Controller('associate_images')
export class AssociateImagesController {
  constructor(
    private readonly associateImagesService: AssociateImagesService,
  ) {}

  @ApiBody({ type: CreateAssociateImagesInput })
  @Post()
  async create(
    @Body() createAssociateImagesInput: CreateAssociateImagesInput,
    @CurrentUser() currentUser: CurrentUserDto,
    @Res() res: Response,
  ) {
    createAssociateImagesInput.user_id = currentUser.id;
    const result = await this.associateImagesService.create(
      createAssociateImagesInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate Image created successfully',
    );
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    const result = await this.associateImagesService.find({
      where: { user_id: currentUser.id },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate Images retrieved successfully',
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.associateImagesService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate Image retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateAssociateImagesInput })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssociateImagesInput: UpdateAssociateImagesInput,
    @Res() res: Response,
  ) {
    const result = await this.associateImagesService.update(id, {
      ...updateAssociateImagesInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate Image updated successfully',
    );
  }

  @Delete()
  @ApiBody({
    type: DeleteAssociateImagesInput,
  })
  async remove(
    @Body() deleteAssociateImagesInput: DeleteAssociateImagesInput,
    @Res() res: Response,
  ) {
    const result = await this.associateImagesService.remove(
      deleteAssociateImagesInput.ids,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate Images deleted successfully',
    );
  }
}
