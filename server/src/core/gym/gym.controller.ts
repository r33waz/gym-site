import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import type { AuthRequest } from '../../interface/auth.interface';

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post('/create')
  create(@Body() createGymDto: CreateGymDto, @Req() req: AuthRequest) {
    return this.gymService.createGym(createGymDto, req.user);
  }

  @Get()
  findAll() {
    return this.gymService.findAllGym();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gymService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGymDto: UpdateGymDto) {
    return this.gymService.updateGym(+id, updateGymDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gymService.deleteGym(+id);
  }
}
