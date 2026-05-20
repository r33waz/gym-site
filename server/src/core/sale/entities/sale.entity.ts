import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { User } from '../../user/entities/user.entity';
import { SaleItem } from '../../sale-item/entities/sale-item.entity';
import { Gym } from '../../gym/entities/gym.entity';

@Entity()
@Index('IDX_SALE_GYM', ['gym'])
@Index('IDX_SALE_USER', ['soldBy'])
/**
 * Represents a complete sales transaction at a gym.
 * Links to the gym, salesperson (user), total amount, and associated sale items.
 *
 * Key Fields: totalAmount
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | Gym | N:1 @ManyToOne | gym |
 * | User | N:1 @ManyToOne | soldBy |
 * | SaleItem | 1:N @OneToMany | items (SaleItem.sale <- Sale) |
 */
export class Sale extends BaseEntity {
  /**
   * Sale belongs to a gym
   */
  @ManyToOne(() => Gym)
  gym!: Gym;
  /**
   * Who sold the product (staff/user)
   */
  @ManyToOne(() => User)
  soldBy!: User;

  @Column('decimal')
  totalAmount!: number;

  @OneToMany(() => SaleItem, (item) => item.sale)
  items!: SaleItem[];
}
