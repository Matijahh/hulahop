import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import {
  CreateAssociateInquiry,
  CreateInquiriesInput,
} from './dto/create-inquiries.input';
import { UpdateInquiriesInput } from './dto/update-inquiries.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';
import { SkipAuth } from '../../core/guards/auth-guard';
import { UsersService } from '../users/users.service';
import { MailerService } from 'src/providers/mailer/mailer.service';

@ApiTags('inquiries')
@ApiBearerAuth()
@Controller('inquiries')
export class InquiriesController {
  constructor(
    private readonly inquiriesService: InquiriesService,
    private readonly userService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  @SkipAuth()
  @ApiBody({ type: CreateInquiriesInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createInquiriesInput: CreateInquiriesInput,
  ) {
    const result = await this.inquiriesService.create(createInquiriesInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Inquiries created successfully',
    );
  }

  @SkipAuth()
  @ApiBody({ type: CreateAssociateInquiry })
  @Post('/associate')
  async associateCreate(
    @Body() createAssociateInquiry: CreateAssociateInquiry,
    @Res() res: Response,
  ) {
    const associate = await this.userService.findOne({
      where: { id: createAssociateInquiry.associate_id },
    });

    this.mailerService.sendEmailBySMTP({
      template: 'contact',
      from: process.env.SMTP_SENDER,
      to: associate.email,
      subject: createAssociateInquiry.subject,
      data: {
        name: createAssociateInquiry.name,
        email: createAssociateInquiry.email,
        number: createAssociateInquiry.mobile,
        subject: createAssociateInquiry.subject,
        message: createAssociateInquiry.message,
      },
    });

    return baseController.getResult(
      res,
      HttpStatus.OK,
      true,
      'Message sent successfully',
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.inquiriesService.find();
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Inquiries retrieved successfully',
    );
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.inquiriesService.findOne({ where: { id } });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Inquiry retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateInquiriesInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInquiriesInput: UpdateInquiriesInput,
  ) {
    const result = await this.inquiriesService.update(id, {
      ...updateInquiriesInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Inquiries updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.inquiriesService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Inquiries deleted successfully',
    );
  }
}
