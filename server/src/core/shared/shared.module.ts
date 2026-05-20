import { Module } from '@nestjs/common';
import {TransactionService} from './transaction.service';
@Module({
  controllers: [],
  providers: [TransactionService],
  // exports the service and any thiung that can be used by other modules
  exports: [TransactionService],
})
export class SharedModule {}
