import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entity/baseEntity';
import { AuthStatus } from '../../../constant/enum/common.enum';
import { User } from '../../user/entities/user.entity';
@Entity({ name: 'auth', schema: 'public' })
@Index('IDX_users_name', ['username'])
export class Auth extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: AuthStatus,
    enumName: 'auth_status_enum',
    default: AuthStatus.PENDING_VERIFICATION,
  })
  status: AuthStatus;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isPhoneVerified: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  passwordChangedAt: Date | null;


  @OneToOne(() => User, (user) => user.auth, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
