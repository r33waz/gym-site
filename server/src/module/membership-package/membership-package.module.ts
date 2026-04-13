import { Module } from '@nestjs/common';
import { MembershipPackageService } from './membership-package.service';
import { MembershipPackageController } from './membership-package.controller';

@Module({
  controllers: [MembershipPackageController],
  providers: [MembershipPackageService],
})
export class MembershipPackageModule {}
