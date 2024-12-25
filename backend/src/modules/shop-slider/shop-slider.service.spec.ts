import { Test, TestingModule } from '@nestjs/testing';
import { ShopSliderService } from './shop-slider.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('ShopSliderService', () => {
    let service: ShopSliderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ShopSliderService],
        }).compile();

        service = module.get<ShopSliderService>(ShopSliderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
