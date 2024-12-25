import { Inquiries } from '../entities/inquiries.entity';
import { dataSource } from '../../../core/data-source';

export const inquiriesRepository = dataSource.getRepository(Inquiries);
