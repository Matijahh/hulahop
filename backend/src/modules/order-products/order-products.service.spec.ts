import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductsService } from './order-products.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('OrderProductsService', () => {
    let service: OrderProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrderProductsService],
        }).compile();

        service = module.get<OrderProductsService>(OrderProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
