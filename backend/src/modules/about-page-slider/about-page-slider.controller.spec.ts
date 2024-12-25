import { Test, TestingModule } from '@nestjs/testing';
import { AboutPageSliderController } from './about-page-slider.controller';
import { AboutPageSliderService } from './about-page-slider.service';

describe('AboutPageSliderController', () => {
  let controller: AboutPageSliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutPageSliderController],
      providers: [AboutPageSliderService],
    }).compile();

    controller = module.get<AboutPageSliderController>(AboutPageSliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
