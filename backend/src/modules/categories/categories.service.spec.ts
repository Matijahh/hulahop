import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('CategoriesService', () => {
    let service: CategoriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoriesService],
        }).compile();

        service = module.get<CategoriesService>(CategoriesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
