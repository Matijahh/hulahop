import { SubCategories } from '../entities/sub-categories.entity';
import { dataSource } from '../../../core/data-source';

export const subCategoriesRepository = dataSource.getRepository(SubCategories);
