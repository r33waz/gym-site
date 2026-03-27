import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './core/employees/employees.module';
import { GymModule } from './core/gym/gym.module';
import { InventoryModule } from './core/inventory/inventory.module';
import { PaymentModule } from './core/payment/payment.module';
import { ProductModule } from './core/product/product.module';
import { SaleItemModule } from './core/sale-item/sale-item.module';
import { SaleModule } from './core/sale/sale.module';
import { UserModule } from './core/user/user.module';
import { AttendanceModule } from './core/attendance/attendance.module';
import { NotificationModule } from './core/notification/notification.module';
import { PayRollModule } from './core/pay_roll/pay_roll.module';
import { LeaveModule } from './core/leave/leave.module';
import { AttendanceModule } from './core/attendance/attendance.module';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', '127.0.0.1'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_NAME', 'mydb'),
        autoLoadEntities: true,
        synchronize: false,
        logging: configService.get('NODE_ENV') !== 'production',
        entities: [__dirname + '/../core/*/*.entity.{ts,js}'],
        migrations: [__dirname + '/../migrations/*.{ts,js}'],
      }),
    }), AttendanceModule, LeaveModule, PayRollModule, NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
