import { Module } from '@nestjs/common';
import { AddressModule } from './shared/address/address.module';
import { AuthModule } from './core/auth/auth.module';
import { GymsModule } from './core/gyms/gyms.module';
import { SaasBillingModule } from './core/saas-billing/saas-billing.module';
import { MembersModule } from './core/members/members.module';
import { PosModule } from './core/pos/pos.module';
import { LockerModule } from './core/locker/locker.module';
import { DocumentModule } from './core/document/document.module';
import { NotificationModule } from './core/notification/notification.module';

@Module({
  imports: [
    AddressModule,
    AuthModule,
    GymsModule,
    SaasBillingModule,
    MembersModule,
    PosModule,
    LockerModule,
    DocumentModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
