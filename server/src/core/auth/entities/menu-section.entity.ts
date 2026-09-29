import { Entity, Column, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { Menu } from './menu.entity';

@Entity({ schema: 'auth', name: 'menu_section' })
export class MenuSection extends BaseEntity {
  // Menu section code.
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 80, unique: true })
  code: string;

  // Menu section name.
  @Column({ type: 'varchar', length: 80 })
  name: string;

  // Position in the sidebar.
  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  // Whether the section is active.
  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_Active: boolean;

  // One section has many menus.
  @OneToMany(() => Menu, (m) => m.section)
  menus: Menu[];
}