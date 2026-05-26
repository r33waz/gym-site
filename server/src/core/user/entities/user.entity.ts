import { Entity, Column, OneToOne, OneToMany, Index } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';
import { GymMember } from '../../gym-member/entities/gym-member.entity';
import { Gym } from '../../gym/entities/gym.entity';
import { SYSTEM_ROLE } from '../../../constant/enum/common.enum';
import { BaseEntity } from '../../../shared/baseEntity';

@Entity('user')
@Index('IDX_USER_USERNAME', ['username']) // fast lookup for login/search
export class User extends BaseEntity {
  @Column()
  username: string; // display + login identifier (optional)

  @Column({
    type: 'enum',
    enum: SYSTEM_ROLE,
    default: SYSTEM_ROLE.USER,
  })
  systemRole?: SYSTEM_ROLE;
  // global role (NOT gym-related)

  @OneToOne(() => Auth, (auth) => auth.user, { onDelete: 'CASCADE' })
  auth: Auth;
  // link to authentication credentials (email/password)

  @OneToMany(() => Gym, (gym) => gym.owner)
  ownedGyms: Gym[];
  // gyms created by this user

  @OneToMany(() => GymMember, (gm) => gm.user)
  memberships: GymMember[];
  // all gyms this user belongs to (important for multi-gym SaaS)
}
