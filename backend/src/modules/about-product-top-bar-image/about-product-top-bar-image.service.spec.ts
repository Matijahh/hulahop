import { Test, TestingModule } from '@nestjs/testing';
import { AboutProductTopBarImageService } from './about-product-top-bar-image.service';

describe('AboutProductTopBarImageService', () => {
  let service: AboutProductTopBarImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutProductTopBarImageService],
    }).compile();

    service = module.get<AboutProductTopBarImageService>(AboutProductTopBarImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
