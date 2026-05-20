import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemPlanDto } from './create-system_plan.dto';

export class UpdateSystemPlanDto extends PartialType(CreateSystemPlanDto) {}
