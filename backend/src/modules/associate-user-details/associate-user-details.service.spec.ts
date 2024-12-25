import { Test, TestingModule } from '@nestjs/testing';
import { AssociateUserDetailsService } from './associate-user-details.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('AssociateUserDetailsService', () => {
    let service: AssociateUserDetailsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AssociateUserDetailsService],
        }).compile();

        service = module.get<AssociateUserDetailsService>(
            AssociateUserDetailsService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
