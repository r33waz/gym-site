import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Index, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ schema: 'auth', name: 'user_roles' })
export class UserRole {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'role_id', type: 'uuid' })
  roleId: string;

  @PrimaryColumn({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Index()
  @ManyToOne(() => User, (u) => u.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @ManyToOne(() => Role, (r) => r.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
