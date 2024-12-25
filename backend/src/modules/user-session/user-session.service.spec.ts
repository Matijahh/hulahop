import { Test, TestingModule } from '@nestjs/testing';
import { UserSessionService } from './user-session.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('UserSessionService', () => {
    let service: UserSessionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserSessionService],
        }).compile();

        service = module.get<UserSessionService>(UserSessionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
