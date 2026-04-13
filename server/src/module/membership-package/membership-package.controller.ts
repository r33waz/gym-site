import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembershipPackageService } from './membership-package.service';
import { CreateMembershipPackageDto } from './dto/create-membership-package.dto';
import { UpdateMembershipPackageDto } from './dto/update-membership-package.dto';

@Controller('membership-package')
export class MembershipPackageController {
  constructor(private readonly membershipPackageService: MembershipPackageService) {}

  @Post()
  create(@Body() createMembershipPackageDto: CreateMembershipPackageDto) {
    return this.membershipPackageService.create(createMembershipPackageDto);
  }

  @Get()
  findAll() {
    return this.membershipPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membershipPackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembershipPackageDto: UpdateMembershipPackageDto) {
    return this.membershipPackageService.update(+id, updateMembershipPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipPackageService.remove(+id);
  }
}
