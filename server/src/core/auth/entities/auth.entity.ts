import { User } from 'src/core/user/entities/user.entity';
import { BaseEntity } from 'src/shared/baseEntity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

@Entity()
@Index('IDX_AUTH_EMAIL', ['email'])
@Index('IDX_AUTH_ACTIVE', ['is_active'])
export class Auth extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  is_active!: boolean;

  @OneToOne(() => User, (user) => user.auth, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @Column({ nullable: true })
  last_login?: Date;

  @Column({ default: 0 })
  login_attempts!: number;
}
