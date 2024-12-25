import { Test, TestingModule } from '@nestjs/testing';
import { ReturnProductsService } from './return-products.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('ReturnProductsService', () => {
    let service: ReturnProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReturnProductsService],
        }).compile();

        service = module.get<ReturnProductsService>(ReturnProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
