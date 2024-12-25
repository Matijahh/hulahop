import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { UsersService } from '../users/users.service';
import { MailerModule } from 'src/providers/mailer/mailer.module';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, UsersService],
  exports: [AnnouncementsService],
  imports: [MailerModule],
})
export class AnnouncementsModule {}
