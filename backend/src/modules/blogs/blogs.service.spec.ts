import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('BlogsService', () => {
    let service: BlogsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlogsService],
        }).compile();

        service = module.get<BlogsService>(BlogsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
