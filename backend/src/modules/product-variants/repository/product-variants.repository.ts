import { ProductVariants } from '../entities/product-variants.entity';
import { dataSource } from '../../../core/data-source';

export const productVariantsRepository =
    dataSource.getRepository(ProductVariants);
