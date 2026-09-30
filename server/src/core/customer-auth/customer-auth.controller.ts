import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerAuthService } from './customer-auth.service';
import { CreateCustomerAuthDto } from './dto/create-customer-auth.dto';
import { UpdateCustomerAuthDto } from './dto/update-customer-auth.dto';

@Controller('customer-auth')
export class CustomerAuthController {
  constructor(private readonly customerAuthService: CustomerAuthService) {}

  @Post()
  create(@Body() createCustomerAuthDto: CreateCustomerAuthDto) {
    return this.customerAuthService.create(createCustomerAuthDto);
  }

  @Get()
  findAll() {
    return this.customerAuthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerAuthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerAuthDto: UpdateCustomerAuthDto) {
    return this.customerAuthService.update(+id, updateCustomerAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerAuthService.remove(+id);
  }
}
