import { Module } from '@nestjs/common';
import { SaasBillingService } from './saas-billing.service';
import { SaasBillingController } from './saas-billing.controller';

@Module({
  controllers: [SaasBillingController],
  providers: [SaasBillingService],
})
export class SaasBillingModule {}
