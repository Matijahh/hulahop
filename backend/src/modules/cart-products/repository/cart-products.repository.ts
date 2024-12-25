import { CartProducts } from '../entities/cart-products.entity';
import { dataSource } from '../../../core/data-source';

export const cartProductsRepository = dataSource.getRepository(CartProducts);
