import { Sizes } from '../entities/sizes.entity';
import { dataSource } from '../../../core/data-source';

export const sizesRepository = dataSource.getRepository(Sizes);
