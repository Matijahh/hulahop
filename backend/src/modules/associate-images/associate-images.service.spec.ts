import { Test, TestingModule } from '@nestjs/testing';
import { AssociateImagesService } from './associate-images.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('AssociateImagesService', () => {
    let service: AssociateImagesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AssociateImagesService],
        }).compile();

        service = module.get<AssociateImagesService>(AssociateImagesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
