import { Test, TestingModule } from '@nestjs/testing';
import { AboutProductSizeChartImageService } from './about-product-size-chart-image.service';

describe('AboutProductSizeChartImageService', () => {
  let service: AboutProductSizeChartImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutProductSizeChartImageService],
    }).compile();

    service = module.get<AboutProductSizeChartImageService>(AboutProductSizeChartImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
