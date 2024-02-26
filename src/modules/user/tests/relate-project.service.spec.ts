import { Test, TestingModule } from '@nestjs/testing';
import { RelateProjectService } from '../services/relate-project.service';

describe('RelateProjectService', () => {
  let service: RelateProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelateProjectService],
    }).compile();

    service = module.get<RelateProjectService>(RelateProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
