import { Test, TestingModule } from '@nestjs/testing';
import { StoreLayoutSlidersService } from './store-layout-sliders.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('StoreLayoutSlidersService', () => {
    let service: StoreLayoutSlidersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreLayoutSlidersService],
        }).compile();

        service = module.get<StoreLayoutSlidersService>(
            StoreLayoutSlidersService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
