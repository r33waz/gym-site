import { Module } from '@nestjs/common';
import { PayRollService } from './pay_roll.service';
import { PayRollController } from './pay_roll.controller';

@Module({
  controllers: [PayRollController],
  providers: [PayRollService],
})
export class PayRollModule {}
