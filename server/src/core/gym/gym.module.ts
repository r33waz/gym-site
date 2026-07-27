import { Module } from '@nestjs/common';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { Gym } from './entities/gym.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [GymController],
  providers: [GymService],
  imports: [TypeOrmModule.forFeature([Gym, User])],
})
export class GymModule {}
