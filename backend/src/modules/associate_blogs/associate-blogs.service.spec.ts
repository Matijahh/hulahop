import { Test, TestingModule } from '@nestjs/testing';
import { AssociateBlogsService } from './associate-blogs.service';

describe('AssociateBlogsService', () => {
  let service: AssociateBlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociateBlogsService],
    }).compile();

    service = module.get<AssociateBlogsService>(AssociateBlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
