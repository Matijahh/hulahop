import { dataSource } from '../../../core/data-source';
import { AboutProductData } from '../entities/about-product-data.entity';

export const aboutProductDataRepository =
  dataSource.getRepository(AboutProductData);
