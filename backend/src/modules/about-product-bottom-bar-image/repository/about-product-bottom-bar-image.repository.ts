import { AboutProductBottomBarImage } from '../entities/about-product-bottom-bar-image.entity';
import { dataSource } from '../../../core/data-source';

export const aboutProductBottomBarImageRepository = dataSource.getRepository(
    AboutProductBottomBarImage,
);
