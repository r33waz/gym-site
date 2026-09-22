import {
  Entity, PrimaryColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { BaseEntity } from '../../../shared/baseEntity';

@Entity({ schema: 'auth', name: 'user_roles' })
export class UserRole extends BaseEntity {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @PrimaryColumn({ name: 'role_id', type: 'int' })
  roleId: number;

  @ManyToOne(() => User, (u) => u.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}