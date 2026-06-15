import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../../shared/baseEntity';
import { SYSTEM_ROLE } from '../../../constant/enum/common.enum';

@Entity('auth')
export class Auth extends BaseEntity {
  // login email (must be unique system-wide)
  @Column({ unique: true })
  email: string;

  // hashed password (NEVER plain text)
  @Column()
  password: string;

  // can disable login if needed
  @Column({ default: true })
  isActive: boolean;

  // role of the user
  @Column({ type: 'enum', enum: SYSTEM_ROLE })


  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn()
  userId: User;
  // back reference to user profile
}
