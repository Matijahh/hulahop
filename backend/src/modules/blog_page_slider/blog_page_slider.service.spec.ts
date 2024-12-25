import { Test, TestingModule } from '@nestjs/testing';
import { BlogPageSliderService } from './blog_page_slider.service';

describe('BlogPageSliderService', () => {
  let service: BlogPageSliderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPageSliderService],
    }).compile();

    service = module.get<BlogPageSliderService>(BlogPageSliderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
