import { USER_ROLE } from 'src/constant/enum';
import { Attendance } from 'src/module/attendance/entities/attendance.entity';
import { Auth } from 'src/module/auth/entities/auth.entity';
import { Gym } from 'src/module/gym/entities/gym.entity';
import { Leave } from 'src/module/leave/entities/leave.entity';
import { BaseEntity } from 'src/shared/baseEntity';
import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
@Index('IDX_USER_USERNAME', ['username'])
@Index('IDX_USER_ROLE', ['role'])
@Index('IDX_USER_CONTACT', ['contact_number'])
@Index('IDX_USER_CITY', ['city'])
export class User extends BaseEntity {
  @Column()
  username!: string;

  @Column()
  first_name!: string;

  @Column()
  middle_name?: string;

  @Column()
  last_name!: string;

  @Column()
  gender!: string;

  @Column({ type: 'enum', enum: USER_ROLE, default: USER_ROLE.USER })
  role!: string;

  @Column()
  contact_number!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  country!: string;

  @Column()
  profile_picture?: string;

  @OneToOne(() => Auth, (auth) => auth.user, { onDelete: 'CASCADE' })
  auth!: Auth;

  // User belongs to a Gym
  @ManyToOne(() => Gym, (gym) => gym.users, { onDelete: 'SET NULL' })
  gym!: Gym;

  // Gyms that this user owns
  @OneToMany(() => Gym, (gym) => gym.owner)
  ownedGyms!: Gym[];

  // user attendances
  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances!: Attendance[];

  // leave of user
  @OneToMany(() => Leave, (leave) => leave.user)
  leaves!: Leave[];
}
