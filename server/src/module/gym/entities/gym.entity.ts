import { Entity, Column, OneToMany, ManyToOne, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../../shared/baseEntity';
import { GymMember } from '../../gym-menber/entities/gym-menber.entity';
import { MembershipPackage } from '../../membership-package/entities/membership-package.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('gyms')
@Index('IDX_GYM_OWNER', ['owner'])
@Index('IDX_GYM_NAME', ['name'])
@Index('IDX_GYM_CITY', ['city'])
/**
 * Represents a gym business entity.
 * Stores location details, owner (user), members, membership packages, and products.
 *
 * Key Fields: name, phone, address, city, state, country, logo, documents[], isActive
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | User | N:1 @ManyToOne | owner (User.ownedGyms -> Gym) |
 * | GymMember | 1:N @OneToMany | members (GymMember.gym <- Gym) |
 * | MembershipPackage | 1:N @OneToMany | packages (MembershipPackage.gym <- Gym) |
 * | Product | 1:N @OneToMany | products (Product.gym <- Gym) |
 * | Attendance | N:1 foreign | Attendance.gym <- Gym |
 * | Payment | N:1 foreign | Payment.gym <- Gym |
 * | Inventory | N:1 foreign | Inventory.gym <- Gym |
 * | Employee | N:1 foreign | Employee.gym <- Gym |
 * | UserMembership | N:1 foreign | UserMembership.gym <- Gym |
 * | Sale | N:1 foreign | Sale.gym <- Gym |
 * | Leave | N:1 foreign | Leave.gym <- Gym |
 */
export class Gym extends BaseEntity {
  @Column()
  name!: string; // Gym name

  @Column({ nullable: true })
  description?: string; // Gym description

  @Column()
  phone!: string; // Contact phone number

  @Column()
  address!: string; // Full address

  @Column()
  city!: string; // City

  @Column()
  state!: string; // State

  @Column()
  country!: string; // Country

  @Column({ nullable: true })
  logo?: string; // Logo URL

  // multiple gym documents
  @Column('text', { array: true, nullable: true })
  documents?: string[]; // Array of document URLs

  // gym active status
  @Column({ default: true })
  isActive!: boolean; // Whether gym is active

  /**
   * Each gym has one owner (User)
   */
  @ManyToOne(() => User, (user) => user.ownedGyms)
  owner!: User;

  /**
   * Users associated with gym via GymMember
   */
  @OneToMany(() => GymMember, (member) => member.gym)
  members!: GymMember[];

  /**
   * Membership packages offered by this gym
   */
  @OneToMany(() => MembershipPackage, (pkg) => pkg.gym)
  packages!: MembershipPackage[];

  /**
   * Products sold by this gym
   */
  @OneToMany(() => Product, (product) => product.gym)
  products!: Product[];
}
