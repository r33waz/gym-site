import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { RefreshToken } from './entities/auth_refresh.token.entity';
import { JwtModule } from '@nestjs/jwt';
import { Menu } from './entities/menu.entity';
import { MenuSection } from './entities/menu-section.entity';
import { CompanyMenu } from './entities/company-menu.entity';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { AuthorizationService } from './services/authorization.service';
import { MenusService } from './services/menu.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, RefreshToken, Menu, MenuSection, CompanyMenu]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, TokenService, AuthorizationService, MenusService],
  exports: [AuthService],
})
export class AuthModule {}
