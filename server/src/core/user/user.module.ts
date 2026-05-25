import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { User } from './entities/user.entity';
import { Gym } from '../gym/entities/gym.entity';
import { SharedModule } from '../shared/shared.module';
import { GymMember } from '../gym-member/entities/gym-member.entity';

@Module({
  // bring functionality from other modules into this module

  imports: [
    TypeOrmModule.forFeature([Auth, User, Gym, GymMember]),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
