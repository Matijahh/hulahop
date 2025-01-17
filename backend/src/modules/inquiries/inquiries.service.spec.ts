import { Test, TestingModule } from '@nestjs/testing';
import { InquiriesService } from './inquiries.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('InquiriesService', () => {
    let service: InquiriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [InquiriesService],
        }).compile();

        service = module.get<InquiriesService>(InquiriesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
