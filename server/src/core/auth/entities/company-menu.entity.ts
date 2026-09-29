// src/auth/entities/company-menu.entity.ts

import {
  Entity, // Marks class as a table.
  PrimaryColumn, // Marks a column as part of the composite PK.
  Column, // Marks a plain column.
  ManyToOne, // Declares the "many companies → one menu" relation.
  JoinColumn, // Tells TypeORM which column is the FK.
  Index, // Creates an index for fast lookups.
  CreateDateColumn, // Auto-fills with row creation time.
} from 'typeorm';

import { Menu } from './menu.entity';

/**
 * Maps to auth.company_menus.
 *
 * WHAT: Which menus the super admin gave to a company.
 * WHY:  This is the gate between the platform and each company.
 *       A permission is only effective if the company has the menu.
 *
 * Composite PK: (company_id, menu_id) — a company either has the menu or doesn't.
 */
@Entity({ schema: 'auth', name: 'company_menus' })
export class CompanyMenu {
  // ─── Composite primary key ────────────────────────────
  // Which company. Part 1 of the PK.
  @PrimaryColumn({ name: 'company_id', type: 'uuid' })
  companyId: string;

  // Which menu. Part 2 of the PK.
  @PrimaryColumn({ name: 'menu_id', type: 'uuid' })
  menuId: string;

  // ─── Payload ──────────────────────────────────────────
  // Toggle without deleting the row. FALSE = hidden for now.
  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled: boolean;

  // When the grant was created.
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  // ─── Relation: many grants → one menu ─────────────────
  // This is the reverse side of Menu.companyMenus.
  // Join used: menus.id = company_menus.menu_id
  @Index()
  @ManyToOne(() => Menu, (m) => m.companyMenus, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}
