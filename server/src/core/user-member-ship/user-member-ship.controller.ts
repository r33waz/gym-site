import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMemberShipService } from './user-member-ship.service';
import { CreateUserMemberShipDto } from './dto/create-user-member-ship.dto';
import { UpdateUserMemberShipDto } from './dto/update-user-member-ship.dto';

@Controller('user-member-ship')
export class UserMemberShipController {
  constructor(private readonly userMemberShipService: UserMemberShipService) {}

  @Post()
  create(@Body() createUserMemberShipDto: CreateUserMemberShipDto) {
    return this.userMemberShipService.create(createUserMemberShipDto);
  }

  @Get()
  findAll() {
    return this.userMemberShipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMemberShipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMemberShipDto: UpdateUserMemberShipDto) {
    return this.userMemberShipService.update(+id, updateUserMemberShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMemberShipService.remove(+id);
  }
}
