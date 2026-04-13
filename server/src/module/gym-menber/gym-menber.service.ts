import { Injectable } from '@nestjs/common';
import { CreateGymMenberDto } from './dto/create-gym-menber.dto';
import { UpdateGymMenberDto } from './dto/update-gym-menber.dto';

@Injectable()
export class GymMenberService {
  create(createGymMenberDto: CreateGymMenberDto) {
    return 'This action adds a new gymMenber';
  }

  findAll() {
    return `This action returns all gymMenber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gymMenber`;
  }

  update(id: number, updateGymMenberDto: UpdateGymMenberDto) {
    return `This action updates a #${id} gymMenber`;
  }

  remove(id: number) {
    return `This action removes a #${id} gymMenber`;
  }
}
