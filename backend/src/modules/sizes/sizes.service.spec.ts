import { Test, TestingModule } from '@nestjs/testing';
import { SizesService } from './sizes.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('SizesService', () => {
    let service: SizesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SizesService],
        }).compile();

        service = module.get<SizesService>(SizesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
