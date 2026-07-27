import { Injectable } from '@nestjs/common';
import { CreateGymBranchDto } from './dto/create-gym_branch.dto';
import { UpdateGymBranchDto } from './dto/update-gym_branch.dto';

@Injectable()
export class GymBranchService {
  create(createGymBranchDto: CreateGymBranchDto) {
    return 'This action adds a new gymBranch';
  }

  findAll() {
    return `This action returns all gymBranch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gymBranch`;
  }

  update(id: number, updateGymBranchDto: UpdateGymBranchDto) {
    return `This action updates a #${id} gymBranch`;
  }

  remove(id: number) {
    return `This action removes a #${id} gymBranch`;
  }
}
