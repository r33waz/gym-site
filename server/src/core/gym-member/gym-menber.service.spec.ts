import { Test, TestingModule } from '@nestjs/testing';
import { GymMenberService } from './gym-menber.service';

describe('GymMenberService', () => {
  let service: GymMenberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GymMenberService],
    }).compile();

    service = module.get<GymMenberService>(GymMenberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
