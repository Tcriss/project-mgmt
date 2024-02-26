import { Test, TestingModule } from '@nestjs/testing';
import { RelateProjectController } from '../controllers/relate-project.controller';

describe('RelateProjectController', () => {
  let controller: RelateProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelateProjectController],
    }).compile();

    controller = module.get<RelateProjectController>(RelateProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
