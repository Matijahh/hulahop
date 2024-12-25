import { Announcements } from '../entities/announcements.entity';
import { dataSource } from '../../../core/data-source';

export const announcementsRepository = dataSource.getRepository(Announcements);
