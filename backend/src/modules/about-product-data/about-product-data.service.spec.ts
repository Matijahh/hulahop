import { Test, TestingModule } from '@nestjs/testing';
import { AboutProductDataService } from './about-product-data.service';

describe('AboutProductDataService', () => {
  let service: AboutProductDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutProductDataService],
    }).compile();

    service = module.get<AboutProductDataService>(AboutProductDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
