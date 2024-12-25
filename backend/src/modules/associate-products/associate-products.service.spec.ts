import { Test, TestingModule } from '@nestjs/testing';
import { AssociateProductsService } from './associate-products.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('AssociateProductsService', () => {
    let service: AssociateProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AssociateProductsService],
        }).compile();

        service = module.get<AssociateProductsService>(
            AssociateProductsService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
