import { Test, TestingModule } from '@nestjs/testing';
import { OrderAddressesService } from './order-addresses.service';

jest.mock('../../core/data-source', () => {
  return {
    dataSource: { getRepository: jest.fn() },
  };
});

describe('OrderAddressesService', () => {
  let service: OrderAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderAddressesService],
    }).compile();

    service = module.get<OrderAddressesService>(OrderAddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
