import { Module } from '@nestjs/common';
import { CustomerAuthService } from './customer-auth.service';
import { CustomerAuthController } from './customer-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CustomerRefreshToken } from './entities/customer_refrestoken.entity';
import { Customer } from './entities/customer.enttit';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRefreshToken, Customer]), JwtModule.register({})],
  controllers: [CustomerAuthController],
  providers: [CustomerAuthService],
})
export class CustomerAuthModule {}
