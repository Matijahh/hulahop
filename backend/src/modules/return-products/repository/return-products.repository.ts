import { ReturnProducts } from '../entities/return-products.entity';
import { dataSource } from '../../../core/data-source';

export const returnProductsRepository =
    dataSource.getRepository(ReturnProducts);
