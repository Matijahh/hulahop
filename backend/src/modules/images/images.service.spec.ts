import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('ImagesService', () => {
    let service: ImagesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ImagesService],
        }).compile();

        service = module.get<ImagesService>(ImagesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
