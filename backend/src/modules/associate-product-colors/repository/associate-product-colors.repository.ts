import { AssociateProductColors } from '../entities/associate-product-colors.entity';
import { dataSource } from '../../../core/data-source';

export const associateProductColorsRepository = dataSource.getRepository(
    AssociateProductColors,
);
