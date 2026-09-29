import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../entities/menu.entity';
import { Repository } from 'typeorm';
import { MenuSection } from '../entities/menu-section.entity';

@Injectable()
export class AuthorizationService {
  // In production with multiple app instances, replace this with Redis.
  private readonly cache = new Map<string, { codes: Set<string>; expires: number }>();
  private readonly CACHE_TTL_MS = 60_000; // 60 seconds

  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,

    @InjectRepository(MenuSection)
    private readonly sectionRepo: Repository<MenuSection>,
  ) {}

  async loadUserPermissions(userId: string, companyId: string) {
    const cacheKey = `${userId}:${companyId}`;
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expires > Date.now()) {
      return cached.codes;
    }

    const permissions = await this.menuRepo
      .createQueryBuilder('menu')
      // Join: role_permissions → menus (via rp.menu_id)
      .innerJoin('auth.role_permissions', 'rp', 'rp.menu_id = menu.id')
      // Join: user_roles → role_permissions (via ur.role_id)
      .innerJoin('auth.user_roles', 'ur', 'ur.role_id = rp.role_id')
      // Join: company_menus → menus (company must have the menu)
      .innerJoin(
        'auth.company_menus',
        'cm',
        'cm.menu_id = menu.id AND cm.company_id = ur.company_id',
      )

      // Filter: user + company
      .where('ur.user_id = :userId', { userId })
      .andWhere('ur.company_id = :companyId', { companyId })
      // Filter: menu must be enabled for the company and globally active
      .andWhere('cm.is_enabled = TRUE')
      .andWhere('menu.is_active = TRUE')
      .select('menu.code', 'menuCode')
      .addSelect('rp.action', 'action')
      .distinct(true)
      .getRawMany<{ menuCode: string; action: string }>();

    const codes = new Set<string>(
      permissions.map((permission) => `${permission.menuCode}:${permission.action}`),
    );

    this.cache.set(cacheKey, {
      codes,
      expires: Date.now() + this.CACHE_TTL_MS,
    });

    return codes;
  }

  //   Check if a user has a specific permission.
  async hasPermission(
    userId: string,
    companyId: string,
    menuCode: string,
    action: string,
  ): Promise<boolean> {
    const codes = await this.loadUserPermissions(userId, companyId);
    return codes.has(`${menuCode}:${action}`);
  }

  //   Build the sidebar menu tree for a user in a company.
  async getMenusForUser(userId: string, companyId: string) {
    // 1. Load sections + menus in one query.
    const rows = await this.sectionRepo
      .createQueryBuilder('s')
      .innerJoin('auth.menu', 'm', 'm.section_id = s.id')
      .innerJoin('auth.role_permissions', 'rp', 'rp.menu_id = m.id')
      .innerJoin('auth.user_roles', 'ur', 'ur.role_id = rp.role_id')
      .innerJoin('auth.company_menus', 'cm', 'cm.menu_id = m.id AND cm.company_id = ur.company_id')
      .where('ur.user_id = :userId', { userId })
      .andWhere('ur.company_id = :companyId', { companyId })
      .andWhere('cm.is_enabled = TRUE')
      .andWhere('m.is_active = TRUE')
      // Select section columns
      .select('s.id', 'sectionId')
      .addSelect('s.code', 'sectionCode')
      .addSelect('s.name', 'sectionName')
      .addSelect('s.sort_order', 'sectionOrder')
      // Select menu columns
      .addSelect('m.id', 'menuId')
      .addSelect('m.code', 'menuCode')
      .addSelect('m.name', 'menuName')
      .addSelect('m.route', 'menuRoute')
      .addSelect('m.icon', 'menuIcon')
      .addSelect('m.parent_id', 'menuParentId')
      .addSelect('m.sort_order', 'menuOrder')
      // Order by section then menu.
      .orderBy('s.sort_order', 'ASC')
      .addOrderBy('m.sort_order', 'ASC')
      .getRawMany();

    // 2. Group by section.
    const sections = new Map<number, any>();
    for (const r of rows) {
      if (!sections.has(r.sectionId)) {
        sections.set(r.sectionId, {
          code: r.sectionCode,
          name: r.sectionName,
          menus: [],
          // Temporary index for tree building.
          _menuIndex: new Map<number, any>(),
        });
      }
    }

    // 3. Build each menu node.
    for (const r of rows) {
      const section = sections.get(r.sectionId);
      const menuNode = {
        id: r.menuId,
        code: r.menuCode,
        name: r.menuName,
        route: r.menuRoute,
        icon: r.menuIcon,
        parentId: r.menuParentId,
        children: [],
      };
      section._menuIndex.set(r.menuId, menuNode);
    }

    // 4. Attach children to parents.
    for (const r of rows) {
      const section = sections.get(r.sectionId);
      const node = section._menuIndex.get(r.menuId);
      if (r.menuParentId && section._menuIndex.has(r.menuParentId)) {
        section._menuIndex.get(r.menuParentId).children.push(node);
      } else {
        section.menus.push(node);
      }
    }

    // 5. Strip the temporary index and return.
    return Array.from(sections.values()).map((s) => {
      delete s._menuIndex;
      return s;
    });
  }

  /**
   * Clear cache for one user in one company.
   * Called when a user's role changes.
   */
  invalidate(userId: string, companyId: string): void {
    this.cache.delete(`${userId}:${companyId}`);
  }

  /**
   * Clear cache for the whole company.
   * Called when a role's permissions change (many users affected),
   * or when a company's menus change.
   */
  invalidateCompany(companyId: string): void {
    const suffix = `:${companyId}`;
    for (const key of this.cache.keys()) {
      if (key.endsWith(suffix)) this.cache.delete(key);
    }
  }
}
