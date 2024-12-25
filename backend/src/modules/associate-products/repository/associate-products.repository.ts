import { AssociateProducts } from '../entities/associate-products.entity';
import { dataSource } from '../../../core/data-source';

export const associateProductsRepository =
  dataSource.getRepository(AssociateProducts);
