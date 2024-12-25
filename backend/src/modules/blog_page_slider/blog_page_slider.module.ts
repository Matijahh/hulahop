import { Module } from '@nestjs/common';
import { BlogPageSliderController } from './blog_page_slider.controller';
import { BlogPageSliderService } from './blog_page_slider.service';

@Module({
  controllers: [BlogPageSliderController],
  providers: [BlogPageSliderService],
  exports: [BlogPageSliderService],
})
export class BlogPageSliderModule {}
