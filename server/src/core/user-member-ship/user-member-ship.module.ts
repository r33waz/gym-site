import { Module } from '@nestjs/common';
import { UserMemberShipService } from './user-member-ship.service';
import { UserMemberShipController } from './user-member-ship.controller';

@Module({
  controllers: [UserMemberShipController],
  providers: [UserMemberShipService],
})
export class UserMemberShipModule {}
