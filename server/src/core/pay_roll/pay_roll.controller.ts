import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayRollService } from './pay_roll.service';
import { CreatePayRollDto } from './dto/create-pay_roll.dto';
import { UpdatePayRollDto } from './dto/update-pay_roll.dto';

@Controller('pay-roll')
export class PayRollController {
  constructor(private readonly payRollService: PayRollService) {}

  @Post()
  create(@Body() createPayRollDto: CreatePayRollDto) {
    return this.payRollService.create(createPayRollDto);
  }

  @Get()
  findAll() {
    return this.payRollService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payRollService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayRollDto: UpdatePayRollDto) {
    return this.payRollService.update(+id, updatePayRollDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payRollService.remove(+id);
  }
}
