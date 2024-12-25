import { Test, TestingModule } from '@nestjs/testing';
import { AboutProductBottomBarImageService } from './about-product-bottom-bar-image.service';

jest.mock('../../core/data-source', () => {
  return {
    dataSource: { getRepository: jest.fn() },
  };
});

describe('AboutProductBottomBarImageService', () => {
  let service: AboutProductBottomBarImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutProductBottomBarImageService],
    }).compile();

    service = module.get<AboutProductBottomBarImageService>(
      AboutProductBottomBarImageService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
