import { Module } from '@nestjs/common';
import { GymMenberService } from './gym-menber.service';
import { GymMenberController } from './gym-menber.controller';

@Module({
  controllers: [GymMenberController],
  providers: [GymMenberService],
})
export class GymMenberModule {}
