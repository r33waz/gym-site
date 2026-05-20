import { Test, TestingModule } from '@nestjs/testing';
import { UserMemberShipService } from './user-member-ship.service';

describe('UserMemberShipService', () => {
  let service: UserMemberShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMemberShipService],
    }).compile();

    service = module.get<UserMemberShipService>(UserMemberShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
