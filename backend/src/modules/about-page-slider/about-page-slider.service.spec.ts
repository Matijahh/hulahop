import { Test, TestingModule } from '@nestjs/testing';
import { AboutPageSliderService } from './about-page-slider.service';

describe('AboutPageSliderService', () => {
  let service: AboutPageSliderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutPageSliderService],
    }).compile();

    service = module.get<AboutPageSliderService>(AboutPageSliderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
