import { dataSource } from '../../../core/data-source';
import { BlogPageSlider } from '../entities/blog_page_slider.entity';

export const blogPageSliderRepository =
  dataSource.getRepository(BlogPageSlider);
