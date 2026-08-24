import { Injectable } from '@nestjs/common';
import { CreateSaasBillingDto } from './dto/create-saas-billing.dto';
import { UpdateSaasBillingDto } from './dto/update-saas-billing.dto';

@Injectable()
export class SaasBillingService {
  create(createSaasBillingDto: CreateSaasBillingDto) {
    return 'This action adds a new saasBilling';
  }

  findAll() {
    return `This action returns all saasBilling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saasBilling`;
  }

  update(id: number, updateSaasBillingDto: UpdateSaasBillingDto) {
    return `This action updates a #${id} saasBilling`;
  }

  remove(id: number) {
    return `This action removes a #${id} saasBilling`;
  }
}
