import { Test, TestingModule } from '@nestjs/testing';
import { MembershipPackageService } from './membership-package.service';

describe('MembershipPackageService', () => {
  let service: MembershipPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipPackageService],
    }).compile();

    service = module.get<MembershipPackageService>(MembershipPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
