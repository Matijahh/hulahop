import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SkipAuth } from 'src/core/guards/auth-guard';
import { Template } from './templates';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  // Add methods here
  @SkipAuth()
  @Post()
  sendEmail(
    @Body()
    emailBody: {
      template: Template;
      data: any;
      to: string;
      from: string;
      headers?: any;
      subject?: string;
    },
  ) {
    return this.mailerService.sendEmailBySMTP(emailBody);
  }
}
