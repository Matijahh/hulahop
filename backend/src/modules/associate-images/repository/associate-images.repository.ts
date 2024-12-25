import { AssociateImages } from '../entities/associate-images.entity';
import { dataSource } from '../../../core/data-source';

export const associateImagesRepository =
    dataSource.getRepository(AssociateImages);
