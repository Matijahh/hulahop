import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { inquiriesRepository } from './repository/inquiries.repository';
import { Inquiries } from './entities/inquiries.entity';
import { CreateInquiriesInput } from './dto/create-inquiries.input';
import { UpdateInquiriesInput } from './dto/update-inquiries.input';
import { MailerService } from 'src/providers/mailer/mailer.service';

@Injectable()
export class InquiriesService extends AbstractService {
  constructor(private mailerService: MailerService) {
    super(inquiriesRepository);
  }

  async create(
    data: CreateInquiriesInput,
    relations: string[] = null,
  ): Promise<Inquiries | boolean> {
    const create = await this.abstractCreate(data, relations);

    this.mailerService.sendEmailBySMTP({
      template: 'contact',
      from: process.env.SMTP_SENDER,
      to: process.env.SMTP_RECEIVER,
      subject: create.subject,
      data: {
        name: create.name,
        email: create.email,
        number: create.mobile,
        subject: create.subject,
        message: create.message,
      },
    });

    return create;
  }

  async update(
    id: number,
    data: UpdateInquiriesInput,
    relations: string[] = null,
  ): Promise<Inquiries | boolean> {
    const update = await this.abstractUpdate(id, { id, ...data }, relations);
    return update;
  }

  async remove(id: number) {
    const inquiriesData = await this.findOne({ where: { id } });
    if (!inquiriesData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
