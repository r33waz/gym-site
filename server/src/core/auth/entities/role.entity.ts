// src/auth/entities/role.entity.ts

import {
  Entity, // Marks class as a table.
  Column, // Marks a property as a column.
  Index, // Creates an index.
  OneToMany, // Declares a one-to-many relation.
  Unique, // Adds a composite unique constraint.
} from 'typeorm';

import { BaseEntity } from '../../../shared/baseEntity';
import { RolePermission } from './role-permission.entity';
import { UserRole } from './user-role.entity';

/**
 * Maps to auth.roles.
 *
 * WHAT: One row = one role inside a company.
 *       Examples: Manager, HR, Accountant.
 *
 * WHY:  Permissions are granted to roles, not directly to users.
 *       A user gets a role; the role grants a set of permissions.
 *
 * NOTE: A role ALWAYS belongs to a company (companyId is required).
 *       Acme's "Manager" and KTM's "Manager" are different rows.
 */
@Entity({ schema: 'auth', name: 'roles' })
@Unique(['companyId', 'name']) // No duplicate role names in a company.
export class Role extends BaseEntity {
  // ─── Who owns this role ───────────────────────────────
  // Which company this role belongs to.
  @Index()
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  // ─── Role identity ────────────────────────────────────
  // Role name. Unique within a company.
  @Column({ type: 'varchar', length: 80 })
  name: string;

  // Optional explanation.
  @Column({ type: 'text', nullable: true })
  description: string | null;

  // ─── Relations ────────────────────────────────────────
  // Which permissions this role grants.
  // Reverse side of RolePermission.role.
  // Join used: roles.id = role_permissions.role_id
  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions: RolePermission[];

  // Which users have this role.
  // Reverse side of UserRole.role.
  // Join used: roles.id = user_roles.role_id
  @OneToMany(() => UserRole, (ur) => ur.role)
  userRoles: UserRole[];

  // Inherited from BaseEntity:
  //   id, createdAt, updatedAt, deletedAt
}
