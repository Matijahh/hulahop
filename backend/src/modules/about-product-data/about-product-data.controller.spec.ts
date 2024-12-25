import { Test, TestingModule } from '@nestjs/testing';
import { AboutProductDataController } from './about-product-data.controller';
import { AboutProductDataService } from './about-product-data.service';

describe('AboutProductDataController', () => {
  let controller: AboutProductDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutProductDataController],
      providers: [AboutProductDataService],
    }).compile();

    controller = module.get<AboutProductDataController>(
      AboutProductDataController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
