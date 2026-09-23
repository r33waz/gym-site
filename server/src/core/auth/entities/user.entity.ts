import { UserStatus } from '../../../constant/enum/common.enum';
import { BaseEntity } from '../../../shared/baseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RefreshToken } from './auth_refresh.token.entity';
import { UserRole } from './user-role.entity';

@Entity({
  schema: 'auth',
  name: 'users',
})
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 30,
  })
  phoneNumber: string;

  @Column({
    name: 'password_hash',
    type: 'text',
  })
  passwordHash: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
  })
  firstName: string;

  @Column({
    name: 'middle_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  middleName: string | null;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
  })
  lastName: string;

  @Column({
    name: 'profile_pic',
    type: 'text',
    nullable: true,
  })
  profilePic: string | null;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({
    name: 'email_verified_at',
    type: 'timestamptz',
    nullable: true,
  })
  emailVerifiedAt: Date | null;

  @Column({
    name: 'phone_verified_at',
    type: 'timestamptz',
    nullable: true,
  })
  phoneVerifiedAt: Date | null;

  @Column({
    name: 'two_factor_enabled',
    type: 'boolean',
    default: false,
  })
  twoFactorEnabled: boolean;

  @Column({
    name: 'two_factor_secret',
    type: 'text',
    nullable: true,
  })
  twoFactorSecret: string | null;

  @Column({
    name: 'last_login_at',
    type: 'timestamptz',
    nullable: true,
  })
  lastLoginAt: Date | null;

  @Column({
    name: 'is_platform_admin',
    type: 'boolean',
    default: false,
  })
  isPlatformAdmin: boolean;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserRole, (ur) => ur.user)
  userRoles: UserRole[];
}
