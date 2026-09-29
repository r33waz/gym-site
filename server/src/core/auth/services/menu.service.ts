// src/auth/menus.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { AuthorizationService } from './authorization.service';
import { Menu } from '../entities/menu.entity';
import { MenuSection } from '../entities/menu-section.entity';
import { CompanyMenu } from '../entities/company-menu.entity';
import { CreateMenuDto } from '../dto/create-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menusRepo: Repository<Menu>,

    @InjectRepository(MenuSection)
    private readonly sectionsRepo: Repository<MenuSection>,

    @InjectRepository(CompanyMenu)
    private readonly companyMenusRepo: Repository<CompanyMenu>,

    private readonly authz: AuthorizationService,
    private readonly dataSource: DataSource,
  ) {}

  async createSection(dto: { code: string; name: string; sortOrder?: number }) {
    return this.sectionsRepo.save(
      this.sectionsRepo.create({
        code: dto.code.toUpperCase(),
        name: dto.name,
        sortOrder: dto.sortOrder ?? 0,
        is_Active: true,
      }),
    );
  }

  async createMenu(dto: CreateMenuDto) {
    // Verify the section exists.
    const section = await this.sectionsRepo.findOne({
      where: { id: dto.sectionId },
    });
    if (!section) throw new NotFoundException('Section not found');

    // If a parent is given, verify it exists.
    if (dto.parentId) {
      const parent = await this.menusRepo.findOne({
        where: { id: dto.parentId },
      });
      if (!parent) throw new NotFoundException('Parent menu not found');
    }

    return this.menusRepo.save(
      this.menusRepo.create({
        sectionId: dto.sectionId,
        parentId: dto.parentId ?? null,
        code: dto.code.toUpperCase(),
        name: dto.name,
        route: dto.route ?? null,
        icon: dto.icon ?? null,
        sortOrder: 0,
        is_Active: true,
      }),
    );
  }

  async listAllAsTree() {
    const sections = await this.sectionsRepo.find({
      where: { is_Active: true },
      order: { sortOrder: 'ASC' },
    });

    const menus = await this.menusRepo.find({
      where: { is_Active: true },
      order: { sortOrder: 'ASC' },
    });

    // Index menus by ID for O(1) lookups.
    const menuIndex = new Map<string, any>();
    for (const m of menus) {
      menuIndex.set(m.id, {
        id: m.id,
        code: m.code,
        name: m.name,
        route: m.route,
        icon: m.icon,
        parentId: m.parentId,
        sortOrder: m.sortOrder,
        children: [],
      });
    }

    // Build the tree per section.
    return sections.map((s) => {
      const sectionMenus = menus.filter((m) => m.sectionId === s.id);
      const roots: any[] = [];
      for (const m of sectionMenus) {
        const node = menuIndex.get(m.id)!;
        if (m.parentId && menuIndex.has(m.parentId)) {
          menuIndex.get(m.parentId)!.children.push(node);
        } else {
          roots.push(node);
        }
      }
      return { id: s.id, code: s.code, name: s.name, menus: roots };
    });
  }

  async grantMenuToCompany(companyId: string, menuId: string) {
    const rows: Array<{ id: string }> = await this.menusRepo.query(
      `
      WITH RECURSIVE subtree AS (
        SELECT id FROM auth.menu WHERE id = $1
        UNION ALL
        SELECT m.id
        FROM auth.menu m
        INNER JOIN subtree s ON m.parent_id = s.id
      )
      SELECT id FROM subtree
      `,
      [menuId],
    );

    const menuIds = rows.map((r) => r.id);

    // Upsert grants. If a row exists, re-enable it; else insert.
    await this.dataSource.transaction(async (manager) => {
      for (const id of menuIds) {
        const existing = await manager.findOne(CompanyMenu, {
          where: { companyId, menuId: id },
        });
        if (existing) {
          existing.isEnabled = true;
          await manager.save(existing);
        } else {
          await manager.save(
            manager.create(CompanyMenu, {
              companyId,
              menuId: id,
              isEnabled: true,
            }),
          );
        }
      }
    });

    // Invalidate cached permissions for the whole company.
    this.authz.invalidateCompany(companyId);

    return { granted: menuIds.length };
  }

  /**
   * Revoke a menu from a company.
   * CASCADES to all descendants.
   */
  async revokeMenuFromCompany(companyId: string, menuId: string) {
    // Same recursive CTE — find the subtree.
    const rows: Array<{ id: string }> = await this.menusRepo.query(
      `
      WITH RECURSIVE subtree AS (
        SELECT id FROM auth.menu WHERE id = $1
        UNION ALL
        SELECT m.id
        FROM auth.menu m
        INNER JOIN subtree s ON m.parent_id = s.id
      )
      SELECT id FROM subtree
      `,
      [menuId],
    );

    const menuIds = rows.map((r) => r.id);

    // Delete all rows for the subtree.
    await this.companyMenusRepo
      .createQueryBuilder()
      .delete()
      .where('company_id = :companyId', { companyId })
      .andWhere('menu_id IN (:...menuIds)', { menuIds })
      .execute();

    // Invalidate cache.
    this.authz.invalidateCompany(companyId);
  }

  async listCompanyMenus(companyId: string) {
    return this.companyMenusRepo
      .createQueryBuilder('cm')
      .innerJoin('cm.menu', 'm')
      .where('cm.companyId = :companyId', { companyId })
      .andWhere('cm.isEnabled = TRUE')
      .select(['m.id AS id', 'm.code AS code', 'm.name AS name', 'm.route AS route'])
      .getRawMany();
  }
}