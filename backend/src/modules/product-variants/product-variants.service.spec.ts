import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantsService } from './product-variants.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('ProductVariantsService', () => {
    let service: ProductVariantsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductVariantsService],
        }).compile();

        service = module.get<ProductVariantsService>(ProductVariantsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
