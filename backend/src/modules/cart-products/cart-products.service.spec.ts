import { Test, TestingModule } from '@nestjs/testing';
import { CartProductsService } from './cart-products.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('CartProductsService', () => {
    let service: CartProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CartProductsService],
        }).compile();

        service = module.get<CartProductsService>(CartProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
