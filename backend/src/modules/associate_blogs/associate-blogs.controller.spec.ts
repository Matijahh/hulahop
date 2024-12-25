import { Test, TestingModule } from '@nestjs/testing';
import { AssociateBlogsController } from './associate-blogs.controller';

describe('AssociateBlogsController', () => {
  let controller: AssociateBlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociateBlogsController],
    }).compile();

    controller = module.get<AssociateBlogsController>(AssociateBlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
