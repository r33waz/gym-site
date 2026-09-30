import { Injectable } from '@nestjs/common';
import { CreateCustomerAuthDto } from './dto/create-customer-auth.dto';
import { UpdateCustomerAuthDto } from './dto/update-customer-auth.dto';

@Injectable()
export class CustomerAuthService {
  create(createCustomerAuthDto: CreateCustomerAuthDto) {
    return 'This action adds a new customerAuth';
  }

  findAll() {
    return `This action returns all customerAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerAuth`;
  }

  update(id: number, updateCustomerAuthDto: UpdateCustomerAuthDto) {
    return `This action updates a #${id} customerAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerAuth`;
  }
}
