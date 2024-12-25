import { Carts } from '../entities/carts.entity';
import { dataSource } from '../../../core/data-source';

export const cartsRepository = dataSource.getRepository(Carts);
