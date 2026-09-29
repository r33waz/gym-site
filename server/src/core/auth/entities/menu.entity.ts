import { Entity, Column, Index, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { MenuSection } from './menu-section.entity';
import { CompanyMenu } from './company-menu.entity';
import { RolePermission } from './role-permission.entity';

@Entity({ schema: 'auth', name: 'menu' })
export class Menu extends BaseEntity {
  @Index()
  @Column({ name: 'section_id', type: 'uuid' })
  sectionId: string;

  @Index()
  @Column({ name: 'name', type: 'varchar', length: 150 })
  name: string;

  @Index()
  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId: string | null;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  code: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  route: string | null;

  @Column({ type: 'varchar', length: 250, nullable: true })
  icon: string | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_Active: boolean;

  // A section has many menus; each menu belongs to exactly one section.
  @ManyToOne(() => MenuSection, (s) => s.menus, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_id' })
  section: MenuSection;

  @ManyToOne(() => Menu, (m) => m.children, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Menu | null;

  @OneToMany(() => Menu, (m) => m.parent)
  children: Menu[];

  @OneToMany(() => CompanyMenu, (cm) => cm.menu)
  companyMenus: CompanyMenu[];

  @OneToMany(() => RolePermission, (rp) => rp.menu)
  rolePermissions: RolePermission[];
}