import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../../shared/baseEntity';

@Entity('auth')
export class Auth extends BaseEntity {
  @Column({ unique: true })
  email: string;
  // login email (must be unique system-wide)

  @Column()
  password: string;
  // hashed password (NEVER plain text)

  @Column({ default: true })
  isActive: boolean;
  // can disable login if needed

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn()
  user: User;
  // back reference to user profile
}
