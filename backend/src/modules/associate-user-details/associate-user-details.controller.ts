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
import { AssociateUserDetailsService } from './associate-user-details.service';
import { CreateAssociateUserDetailsInput } from './dto/create-associate-user-details.input';
import { UpdateAssociateUserDetailsInput } from './dto/update-associate-user-details.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { SkipAuth } from 'src/core/guards/auth-guard';
@ApiTags('associate_user_details')
@ApiBearerAuth()
@Controller('associate_user_details')
export class AssociateUserDetailsController {
  constructor(
    private readonly associateUserDetailsService: AssociateUserDetailsService,
  ) {}

  @ApiBody({ type: CreateAssociateUserDetailsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createAssociateUserDetailsInput: CreateAssociateUserDetailsInput,
  ) {
    const result = await this.associateUserDetailsService.create(
      createAssociateUserDetailsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate user details created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.associateUserDetailsService.find({
      relations: { user: { store_layout_details: true } },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate user details fetched successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.associateUserDetailsService.findOne({
      where: { id },
      relations: { user: { store_layout_details: true } },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate user details fetched successfully',
    );
  }

  @ApiBody({ type: UpdateAssociateUserDetailsInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssociateUserDetailsInput: UpdateAssociateUserDetailsInput,
  ) {
    const result = await this.associateUserDetailsService.update(
      id,
      updateAssociateUserDetailsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate user details updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.associateUserDetailsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate user details deleted successfully',
    );
  }
}
