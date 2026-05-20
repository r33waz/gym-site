import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GymMenberService } from './gym-menber.service';
import { CreateGymMenberDto } from './dto/create-gym-menber.dto';
import { UpdateGymMenberDto } from './dto/update-gym-menber.dto';

@Controller('gym-menber')
export class GymMenberController {
  constructor(private readonly gymMenberService: GymMenberService) {}

  @Post()
  create(@Body() createGymMenberDto: CreateGymMenberDto) {
    return this.gymMenberService.create(createGymMenberDto);
  }

  @Get()
  findAll() {
    return this.gymMenberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gymMenberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGymMenberDto: UpdateGymMenberDto) {
    return this.gymMenberService.update(+id, updateGymMenberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gymMenberService.remove(+id);
  }
}
