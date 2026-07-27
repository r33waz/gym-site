import { Entity, Column, OneToOne, OneToMany, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';
import { GymMember } from '../../gym-member/entities/gym-member.entity';
import { Gym } from '../../gym/entities/gym.entity';
import { SYSTEM_ROLE } from '../../../constant/enum/common.enum';
import { BaseEntity } from '../../../shared/baseEntity';

@Entity('user')
@Index('IDX_USER_USERNAME', ['username']) // fast lookup for login/search
export class User extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column()
  last_name: string;

  @OneToOne(() => Auth, (auth) => auth.userId)
  auth: Auth;

  // branch id

  // profile id

  // owned Gyms
  @OneToMany(() => Gym, (gym) => gym.ownerId)
  ownedGyms: Gym[];

  // which gym this user belongs to (null for gym owner before gym creation)
  @ManyToOne(() => Gym, (gym) => gym.staff, { nullable: true })
  @JoinColumn({ name: 'gym_id' })
  gym: Gym;
}
