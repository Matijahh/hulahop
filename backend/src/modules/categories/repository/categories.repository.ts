import { Categories } from '../entities/categories.entity';
import { dataSource } from '../../../core/data-source';

export const categoriesRepository = dataSource.getRepository(Categories);
