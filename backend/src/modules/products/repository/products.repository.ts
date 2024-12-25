import { Products } from '../entities/products.entity';
import { dataSource } from '../../../core/data-source';

export const productsRepository = dataSource.getRepository(Products);
