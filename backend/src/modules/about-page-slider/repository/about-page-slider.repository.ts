import { dataSource } from '../../../core/data-source';
import { AboutPageSlider } from '../entities/about-page-slider.entity';

export const aboutPageSliderRepository =
  dataSource.getRepository(AboutPageSlider);
