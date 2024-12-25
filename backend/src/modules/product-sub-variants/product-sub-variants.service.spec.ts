import { Test, TestingModule } from '@nestjs/testing';
import { ProductSubVariantsService } from './product-sub-variants.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('ProductSubVariantsService', () => {
    let service: ProductSubVariantsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductSubVariantsService],
        }).compile();

        service = module.get<ProductSubVariantsService>(
            ProductSubVariantsService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
