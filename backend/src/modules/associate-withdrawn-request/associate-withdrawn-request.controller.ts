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
import { AssociateWithdrawnRequestService } from './associate-withdrawn-request.service';
import { CreateAssociateWithdrawnRequestInput } from './dto/create-associate-withdrawn-request.input';
import { UpdateAssociateWithdrawnRequestInput } from './dto/update-associate-withdrawn-request.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { CurrentUser } from 'src/commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@ApiTags('associate_withdrawn_request')
@ApiBearerAuth()
@Controller('associate_withdrawn_request')
export class AssociateWithdrawnRequestController {
  constructor(
    private readonly associateWithdrawnRequestService: AssociateWithdrawnRequestService,
  ) {}

  @ApiBody({ type: CreateAssociateWithdrawnRequestInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body()
    createAssociateWithdrawnRequestInput: CreateAssociateWithdrawnRequestInput,
  ) {
    const result = await this.associateWithdrawnRequestService.create(
      createAssociateWithdrawnRequestInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate Withdrawn Request created successfully',
    );
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    const result = await this.associateWithdrawnRequestService.find({
      where: { user_id: currentUser.type === 'ADMIN' ? null : currentUser.id },
      relations: { user: { store_layout_details: true } },
      order: {
        created_at: 'DESC',
      },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate withdrawn request fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.associateWithdrawnRequestService.findOne({
      where: { id },
      relations: { user: { store_layout_details: true } },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate withdrawn request fetched successfully',
    );
  }

  @ApiBody({ type: UpdateAssociateWithdrawnRequestInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateAssociateWithdrawnRequestInput: UpdateAssociateWithdrawnRequestInput,
  ) {
    const result = await this.associateWithdrawnRequestService.update(
      id,
      updateAssociateWithdrawnRequestInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate withdrawn request updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.associateWithdrawnRequestService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate withdrawn request deleted successfully',
    );
  }
}
