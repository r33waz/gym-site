import { Test, TestingModule } from '@nestjs/testing';
import { MembershipPackageController } from './membership-package.controller';
import { MembershipPackageService } from './membership-package.service';

describe('MembershipPackageController', () => {
  let controller: MembershipPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipPackageController],
      providers: [MembershipPackageService],
    }).compile();

    controller = module.get<MembershipPackageController>(MembershipPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
