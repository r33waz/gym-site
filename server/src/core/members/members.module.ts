import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { AttendanceModule } from './attendance/attendance.module';
import { FitnessPlanModule } from './fitness-plan/fitness-plan.module';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
  imports: [SubscriptionsModule, AttendanceModule, FitnessPlanModule],
})
export class MembersModule {}
