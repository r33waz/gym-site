import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './module/employees/employees.module';
import { GymModule } from './module/gym/gym.module';
import { InventoryModule } from './module/inventory/inventory.module';
import { PaymentModule } from './module/payment/payment.module';
import { ProductModule } from './module/product/product.module';
import { SaleItemModule } from './module/sale-item/sale-item.module';
import { SaleModule } from './module/sale/sale.module';
import { UserModule } from './module/user/user.module';
import { NotificationModule } from './module/notification/notification.module';
import { PayRollModule } from './module/pay_roll/pay_roll.module';
import { LeaveModule } from './module/leave/leave.module';
import { AttendanceModule } from './module/attendance/attendance.module';
import { configService } from './config/database/database.config';
import { GymMenberModule } from './module/gym-menber/gym-menber.module';
import { MembershipPackageModule } from './module/membership-package/membership-package.module';
import { UserMemberShipModule } from './module/user-member-ship/user-member-ship.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    GymModule,
    EmployeesModule,
    PaymentModule,
    ProductModule,
    InventoryModule,
    SaleModule,
    SaleItemModule,
    ConfigModule.forRoot({ isGlobal: true }), // load .env
    TypeOrmModule.forRootAsync(configService),
    AttendanceModule,
    LeaveModule,
    PayRollModule,
    NotificationModule,
    GymMenberModule,
    MembershipPackageModule,
    UserMemberShipModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
