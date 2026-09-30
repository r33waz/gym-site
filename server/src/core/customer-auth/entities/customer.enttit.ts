import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { CustomerRefreshToken } from './customer_refrestoken.entity';

@Entity({ schema: 'auth', name: 'customer' })
export class Customer extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ name: 'first_name', type: 'varchar', length: 200 })
  firstName: string;

  @Column({ name: 'middle_name', type: 'varchar', length: 200 })
  middleName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 200 })
  lastName: string;

  @Column({ name: 'mobile_number', type: 'varchar', length: 20, nullable: true })
  mobileNumber: string | null;

  @Column({ name: 'password_hash', type: 'text', nullable: true })
  passwordHash: string | null;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ name: 'email_verified_at', type: 'timestamptz', nullable: true })
  emailVerifiedAt: Date | null;

  @OneToMany(() => CustomerRefreshToken, (customer_token) => customer_token.customer)
  customer_refreshTokens:CustomerRefreshToken[]
}
