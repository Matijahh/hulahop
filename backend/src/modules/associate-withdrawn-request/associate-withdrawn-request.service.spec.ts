import { Test, TestingModule } from '@nestjs/testing';
import { AssociateWithdrawnRequestService } from './associate-withdrawn-request.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('AssociateWithdrawnRequestService', () => {
    let service: AssociateWithdrawnRequestService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AssociateWithdrawnRequestService],
        }).compile();

        service = module.get<AssociateWithdrawnRequestService>(
            AssociateWithdrawnRequestService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
