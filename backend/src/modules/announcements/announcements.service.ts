import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { announcementsRepository } from './repository/announcements.repository';
import { Announcements } from './entities/announcements.entity';
import { CreateAnnouncementsInput } from './dto/create-announcements.input';
import { UpdateAnnouncementsInput } from './dto/update-announcements.input';
import { UsersService } from '../users/users.service';
import { MailerService } from 'src/providers/mailer/mailer.service';

@Injectable()
export class AnnouncementsService extends AbstractService {
  constructor(private readonly usersService: UsersService, private readonly mailerService: MailerService) {
    super(announcementsRepository);
  }

  async create(
    data: CreateAnnouncementsInput,
    relations: string[] = null,
  ): Promise<Announcements | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
  
    // Send announcement emails if status is true
    if(create.status){
      this.sendAnnouncementEmails(create);
    }
    
    return create;
  }
  
  async update(
    id: number,
    data: UpdateAnnouncementsInput,
    relations: string[] = null,
  ): Promise<Announcements | boolean> {
    const announcementData = await this.findOne({ where: { id } });
    if (!announcementData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, { ...data, id }, relations);

    // Send announcement emails if status is true
    if(update.status){
      this.sendAnnouncementEmails(update);
    }

    return update;
  }

  async remove(id: number) {
    const announcementData = await this.findOne({ where: { id } });
    if (!announcementData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }

  async sendAnnouncementEmails(data: Announcements) {
    const associatesList = await this.usersService.getAllAssociates();
      // Generate HTML for the announcement email
      const html = this.mailerService.generateHtml({
        fileName: 'announcement',
        context: {
          title: data.title,
          description: data.description,
        },
      });
    
      // Iterate over the associates list and send emails
      for (const associate of associatesList) {
        try {
          await this.mailerService.sendAnnouncement({
            from: process.env.SMTP_USER,
            to: associate.email,
            subject: data.title,
            html,
          });
          console.log(`Email successfully sent to ${associate.email}`);
        } catch (error) {
          console.error(`Failed to send email to ${associate.email}:`, error.message);
        }
      }
    }
}
