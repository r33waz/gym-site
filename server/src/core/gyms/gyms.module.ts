import { Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { BranchesModule } from './branches/branches.module';
import { FeaturesModule } from './features/features.module';

@Module({
  controllers: [GymsController],
  providers: [GymsService],
  imports: [BranchesModule, FeaturesModule],
})
export class GymsModule {}
