import { Injectable } from '@nestjs/common';
import { CreatePayRollDto } from './dto/create-pay_roll.dto';
import { UpdatePayRollDto } from './dto/update-pay_roll.dto';

@Injectable()
export class PayRollService {
  create(createPayRollDto: CreatePayRollDto) {
    return 'This action adds a new payRoll';
  }

  findAll() {
    return `This action returns all payRoll`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payRoll`;
  }

  update(id: number, updatePayRollDto: UpdatePayRollDto) {
    return `This action updates a #${id} payRoll`;
  }

  remove(id: number) {
    return `This action removes a #${id} payRoll`;
  }
}
