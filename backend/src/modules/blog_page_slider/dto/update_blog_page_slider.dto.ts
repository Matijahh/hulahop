import { PartialType } from '@nestjs/swagger';
import { CreateBlogPageSliderInput } from './create_blog_page_slider.dto';

export class UpdateBlogPageSliderInput extends PartialType(
  CreateBlogPageSliderInput,
) {
  id: number;
}
