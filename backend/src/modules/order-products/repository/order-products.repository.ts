import { OrderProducts } from '../entities/order-products.entity';
import { dataSource } from '../../../core/data-source';

export const orderProductsRepository = dataSource.getRepository(OrderProducts);
