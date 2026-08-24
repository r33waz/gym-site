import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaasBillingService } from './saas-billing.service';
import { CreateSaasBillingDto } from './dto/create-saas-billing.dto';
import { UpdateSaasBillingDto } from './dto/update-saas-billing.dto';

@Controller('saas-billing')
export class SaasBillingController {
  constructor(private readonly saasBillingService: SaasBillingService) {}

  @Post()
  create(@Body() createSaasBillingDto: CreateSaasBillingDto) {
    return this.saasBillingService.create(createSaasBillingDto);
  }

  @Get()
  findAll() {
    return this.saasBillingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saasBillingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaasBillingDto: UpdateSaasBillingDto) {
    return this.saasBillingService.update(+id, updateSaasBillingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saasBillingService.remove(+id);
  }
}
