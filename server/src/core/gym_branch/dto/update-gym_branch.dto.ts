import { PartialType } from '@nestjs/mapped-types';
import { CreateGymBranchDto } from './create-gym_branch.dto';

export class UpdateGymBranchDto extends PartialType(CreateGymBranchDto) {}
