import { Orders } from '../entities/orders.entity';
import { dataSource } from '../../../core/data-source';

export const ordersRepository = dataSource.getRepository(Orders);
