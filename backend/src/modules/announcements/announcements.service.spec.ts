import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementsService } from './announcements.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('AnnouncementsService', () => {
    let service: AnnouncementsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnnouncementsService],
        }).compile();

        service = module.get<AnnouncementsService>(AnnouncementsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
