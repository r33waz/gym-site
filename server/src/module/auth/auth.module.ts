import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { LoginHistory } from './entities/login-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auth, RefreshToken, LoginHistory]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
