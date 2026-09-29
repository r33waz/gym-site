// src/auth/entities/role-permission.entity.ts

import {
  Entity, // Marks class as a table.
  PrimaryColumn, // Marks a column as part of the composite PK.
  Column, // Regular column (unused here but kept for clarity).
  ManyToOne, // Many grants → one role; many grants → one menu.
  JoinColumn, // Specifies the FK column name.
  Index, // Creates indexes for fast lookups.
  CreateDateColumn, // Auto-fills on creation.
} from 'typeorm';

import { Role } from './role.entity';
import { Menu } from './menu.entity';

/**
 * Maps to auth.role_permissions.
 *
 * WHAT: "This role has this action on this menu."
 * WHY:  This is where the actual grants live. Each row is one checkbox
 *       in the company admin's role editor UI.
 *
 * Composite PK: (role_id, menu_id, action).
 * A role either HAS a permission or DOESN'T — no duplicates possible.
 */
@Entity({ schema: 'auth', name: 'role_permissions' })
export class RolePermission {
  // ─── Composite primary key ────────────────────────────
  // Which role. Part 1 of the PK.
  @PrimaryColumn({ name: 'role_id', type: 'uuid' })
  roleId: string;

  // Which menu. Part 2 of the PK.
  @PrimaryColumn({ name: 'menu_id', type: 'uuid' })
  menuId: string;

  // Which action. Part 3 of the PK.
  // One of: CREATE, READ, UPDATE, DELETE.
  @PrimaryColumn({ name: 'action', type: 'varchar', length: 20 })
  action: string;

  // ─── Payload ──────────────────────────────────────────
  // When this grant was created.
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  // ─── Relation: many grants → one role ─────────────────
  // Reverse side of Role.rolePermissions.
  // Join used: roles.id = role_permissions.role_id
  @Index()
  @ManyToOne(() => Role, (r) => r.rolePermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // ─── Relation: many grants → one menu ─────────────────
  // Reverse side of Menu.rolePermissions.
  // Join used: menus.id = role_permissions.menu_id
  @Index()
  @ManyToOne(() => Menu, (m) => m.rolePermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}
