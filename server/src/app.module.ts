import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './core/employees/employees.module';
import { InventoryModule } from './core/inventory/inventory.module';
import { PaymentModule } from './core/payment/payment.module';
import { ProductModule } from './core/product/product.module';
import { SaleItemModule } from './core/sale-item/sale-item.module';
import { SaleModule } from './core/sale/sale.module';
import { UserModule } from './core/user/user.module';
import { NotificationModule } from './core/notification/notification.module';
import { PayRollModule } from './core/pay_roll/pay_roll.module';
import { LeaveModule } from './core/leave/leave.module';
import { AttendanceModule } from './core/attendance/attendance.module';
import { configService } from './config/database/database.config';
import { GymMenberModule } from './core/gym-member/gym-menber.module';
import { MembershipPackageModule } from './core/membership-package/membership-package.module';
import { UserMemberShipModule } from './core/user-member-ship/user-member-ship.module';
import { GymModule } from './core/gym/gym.module';
import { SystemPlanModule } from './core/system_plan/system_plan.module';
import { SharedModule } from './core/shared/shared.module';
import { GymBranchModule } from './core/gym_branch/gym_branch.module';

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
    SystemPlanModule,
    SharedModule,
    GymBranchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
