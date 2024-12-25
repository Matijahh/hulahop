import { ShopSlider } from '../entities/shop-slider.entity';
import { dataSource } from '../../../core/data-source';

export const shopSliderRepository = dataSource.getRepository(ShopSlider);
