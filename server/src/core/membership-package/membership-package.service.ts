import { Injectable } from '@nestjs/common';
import { CreateMembershipPackageDto } from './dto/create-membership-package.dto';
import { UpdateMembershipPackageDto } from './dto/update-membership-package.dto';

@Injectable()
export class MembershipPackageService {
  create(createMembershipPackageDto: CreateMembershipPackageDto) {
    return 'This action adds a new membershipPackage';
  }

  findAll() {
    return `This action returns all membershipPackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} membershipPackage`;
  }

  update(id: number, updateMembershipPackageDto: UpdateMembershipPackageDto) {
    return `This action updates a #${id} membershipPackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} membershipPackage`;
  }
}
