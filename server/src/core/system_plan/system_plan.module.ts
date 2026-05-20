import { Module } from '@nestjs/common';
import { SystemPlanService } from './system_plan.service';
import { SystemPlanController } from './system_plan.controller';

@Module({
  controllers: [SystemPlanController],
  providers: [SystemPlanService],
})
export class SystemPlanModule {}
