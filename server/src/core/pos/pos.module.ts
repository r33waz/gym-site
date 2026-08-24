import { Module } from '@nestjs/common';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';

@Module({
  controllers: [PosController],
  providers: [PosService],
  imports: [InventoryModule, SalesModule],
})
export class PosModule {}
