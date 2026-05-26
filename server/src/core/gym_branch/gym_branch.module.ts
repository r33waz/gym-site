import { Module } from '@nestjs/common';
import { GymBranchService } from './gym_branch.service';
import { GymBranchController } from './gym_branch.controller';

@Module({
  controllers: [GymBranchController],
  providers: [GymBranchService],
})
export class GymBranchModule {}
