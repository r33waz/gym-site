import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GymBranchService } from './gym_branch.service';
import { CreateGymBranchDto } from './dto/create-gym_branch.dto';
import { UpdateGymBranchDto } from './dto/update-gym_branch.dto';

@Controller('gym-branch')
export class GymBranchController {
  constructor(private readonly gymBranchService: GymBranchService) {}

  @Post()
  create(@Body() createGymBranchDto: CreateGymBranchDto) {
    return this.gymBranchService.create(createGymBranchDto);
  }

  @Get()
  findAll() {
    return this.gymBranchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gymBranchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGymBranchDto: UpdateGymBranchDto) {
    return this.gymBranchService.update(+id, updateGymBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gymBranchService.remove(+id);
  }
}
