import { Injectable } from '@nestjs/common';
import { CreateSystemPlanDto } from './dto/create-system_plan.dto';
import { UpdateSystemPlanDto } from './dto/update-system_plan.dto';

@Injectable()
export class SystemPlanService {
  create(createSystemPlanDto: CreateSystemPlanDto) {
    return 'This action adds a new systemPlan';
  }

  findAll() {
    return `This action returns all systemPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemPlan`;
  }

  update(id: number, updateSystemPlanDto: UpdateSystemPlanDto) {
    return `This action updates a #${id} systemPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemPlan`;
  }
}
