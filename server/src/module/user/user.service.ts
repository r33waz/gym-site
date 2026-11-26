import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all user`;
  }

  async findById(userId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.auth', 'auth')
      .select([
        'user.id',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.phoneNumber',
        'user.createdAt',
      ])
      .addSelect([
        'auth.email',
        'auth.username',
        'auth.status',
        'auth.isEmailVerified',
        'auth.isPhoneVerified',
      ])
      .where('user.id=:userId', { userId })
      .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
