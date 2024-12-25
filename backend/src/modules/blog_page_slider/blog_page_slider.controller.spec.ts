import { Test, TestingModule } from '@nestjs/testing';
import { BlogPageSliderController } from './blog_page_slider.controller';

describe('BlogPageSliderController', () => {
  let controller: BlogPageSliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPageSliderController],
    }).compile();

    controller = module.get<BlogPageSliderController>(BlogPageSliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
