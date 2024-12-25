import { Colors } from '../entities/colors.entity';
import { dataSource } from '../../../core/data-source';

export const colorsRepository = dataSource.getRepository(Colors);
