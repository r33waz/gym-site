import { Test, TestingModule } from '@nestjs/testing';
import { GymMenberController } from './gym-menber.controller';
import { GymMenberService } from './gym-menber.service';

describe('GymMenberController', () => {
  let controller: GymMenberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GymMenberController],
      providers: [GymMenberService],
    }).compile();

    controller = module.get<GymMenberController>(GymMenberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
