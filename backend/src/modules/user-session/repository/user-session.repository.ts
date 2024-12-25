import { UserSession } from '../entities/user-session.entity';
import { dataSource } from '../../../core/data-source';

export const userSessionRepository = dataSource.getRepository(UserSession);
