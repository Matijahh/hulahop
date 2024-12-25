import { Module } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { InquiriesController } from './inquiries.controller';
import { MailerModule } from 'src/providers/mailer/mailer.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [InquiriesController],
  providers: [InquiriesService],
  exports: [InquiriesService],
  imports: [MailerModule, UsersModule],
})
export class InquiriesModule {}
