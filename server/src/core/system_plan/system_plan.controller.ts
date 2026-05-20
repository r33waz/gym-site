import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemPlanService } from './system_plan.service';
import { CreateSystemPlanDto } from './dto/create-system_plan.dto';
import { UpdateSystemPlanDto } from './dto/update-system_plan.dto';

@Controller('system-plan')
export class SystemPlanController {
  constructor(private readonly systemPlanService: SystemPlanService) {}

  @Post()
  create(@Body() createSystemPlanDto: CreateSystemPlanDto) {
    return this.systemPlanService.create(createSystemPlanDto);
  }

  @Get()
  findAll() {
    return this.systemPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemPlanDto: UpdateSystemPlanDto) {
    return this.systemPlanService.update(+id, updateSystemPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemPlanService.remove(+id);
  }
}
