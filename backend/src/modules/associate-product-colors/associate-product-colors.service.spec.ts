import { Test, TestingModule } from '@nestjs/testing';
import { AssociateProductColorsService } from './associate-product-colors.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('AssociateProductColorsService', () => {
    let service: AssociateProductColorsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AssociateProductColorsService],
        }).compile();

        service = module.get<AssociateProductColorsService>(
            AssociateProductColorsService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
