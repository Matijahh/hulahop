import { dataSource } from 'src/core/data-source';
import { AboutProductTopBarImage } from '../entities/about-product-top-bar-image.entity';

export const aboutProductTopBarImageRepository = dataSource.getRepository(
  AboutProductTopBarImage,
);
