import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FitnessPlanService } from './fitness-plan.service';
import { CreateFitnessPlanDto } from './dto/create-fitness-plan.dto';
import { UpdateFitnessPlanDto } from './dto/update-fitness-plan.dto';

@Controller('fitness-plan')
export class FitnessPlanController {
  constructor(private readonly fitnessPlanService: FitnessPlanService) {}

  @Post()
  create(@Body() createFitnessPlanDto: CreateFitnessPlanDto) {
    return this.fitnessPlanService.create(createFitnessPlanDto);
  }

  @Get()
  findAll() {
    return this.fitnessPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fitnessPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFitnessPlanDto: UpdateFitnessPlanDto) {
    return this.fitnessPlanService.update(+id, updateFitnessPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fitnessPlanService.remove(+id);
  }
}
