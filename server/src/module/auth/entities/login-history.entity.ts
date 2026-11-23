import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auth } from './auth.entity';
import { BaseEntity } from '../../../shared/entity/baseEntity';

@Entity({ name: 'login_history' })
export class LoginHistory extends BaseEntity {
    
  @ManyToOne(() => Auth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_auth_id' })
  userAuth: Auth;

  @Column({ type: 'boolean' })
  isSuccessful: boolean;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userAgent: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  failureReason: string | null;
}
