import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { Product } from '../../product/entities/product.entity';
import { Gym } from '../../gym/entities/gym.entity';

@Entity()
@Index('IDX_INVENTORY_PRODUCT', ['product'])
@Index('IDX_INVENTORY_GYM', ['gym'])
/**
 * Represents inventory stock levels for products at a specific gym.
 * Tracks quantity available per product-gym combination.
 *
 * Key Fields: quantity
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | Product | N:1 @ManyToOne | product |
 * | Gym | N:1 @ManyToOne | gym |
 */
export class Inventory extends BaseEntity {
  /**
   * Inventory is for a specific product
   */
  @ManyToOne(() => Product)
  product!: Product; // Product being tracked
  /**
   * Inventory belongs to a gym
   */
  @ManyToOne(() => Gym)
  gym!: Gym; // Gym location for inventory

  @Column({ default: 0 })
  quantity!: number; // Current stock quantity
}
