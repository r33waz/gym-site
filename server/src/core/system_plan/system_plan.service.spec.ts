import { Test, TestingModule } from '@nestjs/testing';
import { SystemPlanService } from './system_plan.service';

describe('SystemPlanService', () => {
  let service: SystemPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemPlanService],
    }).compile();

    service = module.get<SystemPlanService>(SystemPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
