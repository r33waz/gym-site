import { Injectable } from '@nestjs/common';
import { CreateUserMemberShipDto } from './dto/create-user-member-ship.dto';
import { UpdateUserMemberShipDto } from './dto/update-user-member-ship.dto';

@Injectable()
export class UserMemberShipService {
  create(createUserMemberShipDto: CreateUserMemberShipDto) {
    return 'This action adds a new userMemberShip';
  }

  findAll() {
    return `This action returns all userMemberShip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMemberShip`;
  }

  update(id: number, updateUserMemberShipDto: UpdateUserMemberShipDto) {
    return `This action updates a #${id} userMemberShip`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMemberShip`;
  }
}
