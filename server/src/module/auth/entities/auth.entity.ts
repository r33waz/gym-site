import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { User } from '../../user/entities/user.entity';

@Entity()
@Index('IDX_AUTH_EMAIL', ['email'], { unique: true })
@Index('IDX_AUTH_ACTIVE', ['is_active'])
/**
 * Represents user authentication credentials and session data.
 * Handles email, password, activity status, login history, linked to one user.
 *
 * Key Fields: email, password, username, is_active, last_login, login_attempts
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | User | 1:1 @OneToOne | user (User.auth -> Auth, CASCADE) |
 */
export class Auth extends BaseEntity {
  @Column({ unique: true })
  email!: string; // Unique user email

  @Column()
  password!: string; // Hashed password

  @Column()
  username!: string; // Login username

  @Column({ default: true })
  is_active!: boolean; // Account active status

  /**
   * Auth belongs to exactly one user
   */

  @OneToOne(() => User, (user) => user.auth, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User; // Linked user profile

  @Column({ nullable: true })
  last_login?: Date; // Last successful login time

  @Column({ default: 0 })
  login_attempts!: number; // Failed login attempts count
}
