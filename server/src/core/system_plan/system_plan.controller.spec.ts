import { Test, TestingModule } from '@nestjs/testing';
import { SystemPlanController } from './system_plan.controller';
import { SystemPlanService } from './system_plan.service';

describe('SystemPlanController', () => {
  let controller: SystemPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemPlanController],
      providers: [SystemPlanService],
    }).compile();

    controller = module.get<SystemPlanController>(SystemPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
