import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';

jest.mock('../../core/data-source', () => {
    return {
        dataSource: { getRepository: jest.fn() },
    };
});

describe('CartsService', () => {
    let service: CartsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CartsService],
        }).compile();

        service = module.get<CartsService>(CartsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
