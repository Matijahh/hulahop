import { ProductSubVariants } from '../entities/product-sub-variants.entity';
import { dataSource } from '../../../core/data-source';

export const productSubVariantsRepository =
    dataSource.getRepository(ProductSubVariants);
