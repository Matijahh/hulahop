import { Images } from '../entities/images.entity';
import { dataSource } from '../../../core/data-source';

export const imagesRepository = dataSource.getRepository(Images);
