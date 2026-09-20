import { Module } from '@nestjs/common';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { CompaniesModule } from './core/companies/companies.module';
import { EmployeesModule } from './core/employees/employees.module';
import { CustomersModule } from './core/customers/customers.module';
import { CatalogModule } from './core/catalog/catalog.module';
import { BookingsModule } from './core/bookings/bookings.module';
import { JobsModule } from './core/jobs/jobs.module';
import { AttendanceModule } from './core/attendance/attendance.module';
import { BillingModule } from './core/billing/billing.module';
import { PayrollModule } from './core/payroll/payroll.module';
import { ReviewsModule } from './core/reviews/reviews.module';
import { NotificationsModule } from './core/notifications/notifications.module';
import { SubscriptionsModule } from './core/subscriptions/subscriptions.module';
import { AuditModule } from './core/audit/audit.module';
import { FilesModule } from './core/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/database/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(configService),
    UserModule,
    AuthModule,
    CompaniesModule,
    EmployeesModule,
    CustomersModule,
    CatalogModule,
    BookingsModule,
    JobsModule,
    AttendanceModule,
    BillingModule,
    PayrollModule,
    ReviewsModule,
    NotificationsModule,
    SubscriptionsModule,
    AuditModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
