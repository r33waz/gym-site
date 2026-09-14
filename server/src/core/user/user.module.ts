import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerService } from './loger.service';

@Module({
  controllers: [UserController],
  providers: [UserService, LoggerService],
})
export class UserModule {}
