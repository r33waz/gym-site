import { Entity, Column, ManyToOne, Index, Unique } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Gym } from '../../gym/entities/gym.entity';
import { GYM_ROLE } from '../../../constant/enum/common.enum';
import { BaseEntity } from '../../../shared/baseEntity';

@Entity('gym_members')
@Index(['gym'])
@Index(['user'])
@Index(['role'])
@Entity('gym_members')
@Unique(['user', 'gym'])
export class GymMember extends BaseEntity {
  @ManyToOne(() => User, (user) => user.memberships)
  user: User;
  // which user belongs to gym

  @ManyToOne(() => Gym, (gym) => gym.members)
  gym: Gym;
  // which gym the user have the memebership

  @Column({
    type: 'enum',
    enum: GYM_ROLE,
    default: GYM_ROLE.MEMBER,
  })
  role: GYM_ROLE;
  // role inside THIS gym only

  @Column({ default: true })
  isActive: boolean;
  // can deactivate user from gym without deleting
}
