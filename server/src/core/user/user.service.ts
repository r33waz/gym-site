import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from './loger.service';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'admin',
      isActive: true,
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'user',
      isActive: true,
    },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      role: 'user',
      isActive: false,
    },
  ];

  constructor(private readonly loggerService: LoggerService) {}

  create(createUserDto: CreateUserDto) {
    this.loggerService.log(`User ${createUserDto.name} created successfully`);

    this.users.push(createUserDto);

    return this.users;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    this.loggerService.log(`User ${id} finding...`);
    const filtredData = this.users.find((a) => a.id === id);
    return { data: filtredData, message: `User ${filtredData?.name} found successfully` };
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.loggerService.log(`User ${id} deleting...`);
    const filtredData = this.users.find((a) => a.id === id);
    return { data: filtredData, message: `User ${filtredData?.name} delete successfully` };
  }
}
