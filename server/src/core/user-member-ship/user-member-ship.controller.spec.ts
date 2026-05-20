import { Test, TestingModule } from '@nestjs/testing';
import { UserMemberShipController } from './user-member-ship.controller';
import { UserMemberShipService } from './user-member-ship.service';

describe('UserMemberShipController', () => {
  let controller: UserMemberShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMemberShipController],
      providers: [UserMemberShipService],
    }).compile();

    controller = module.get<UserMemberShipController>(UserMemberShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
