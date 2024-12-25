import { Test, TestingModule } from '@nestjs/testing';
import { StoreLayoutDetailsService } from './store-layout-details.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('StoreLayoutDetailsService', () => {
    let service: StoreLayoutDetailsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreLayoutDetailsService],
        }).compile();

        service = module.get<StoreLayoutDetailsService>(
            StoreLayoutDetailsService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
