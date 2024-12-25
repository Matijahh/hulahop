import { Users } from '../entities/users.entity';
import { dataSource } from '../../../core/data-source';

export const usersRepository = dataSource.getRepository(Users);
