import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { AttendanceModule } from './module/attendance/attendance.module';
import { NotificationModule } from './module/notification/notification.module';
import { PayRollModule } from './module/pay_roll/pay_roll.module';
import { LeaveModule } from './module/leave/leave.module';
import { AttendanceModule } from './module/attendance/attendance.module';

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
