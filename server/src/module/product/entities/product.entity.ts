import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { Gym } from '../../gym/entities/gym.entity';

@Entity()
@Index('IDX_PRODUCT_GYM', ['gym'])
/**
 * Represents a product item available for sale within a specific gym.
 * Includes essential details like name, price, and association to the parent gym.
 *
 * Key Fields: name, price
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | Gym | N:1 @ManyToOne | gym (Gym.products -> Product) |
 * | SaleItem | N:1 foreign | SaleItem.product <- Product |
 * | Inventory | N:1 foreign | Inventory.product <- Product |
 */
export class Product extends BaseEntity {
  @Column()
  name!: string; // Name of the product

  @Column('decimal')
  price!: number; // Selling price of the product

  /**
   * Product belongs to a gym
   */
  @ManyToOne(() => Gym, (gym) => gym.products)
  gym!: Gym; // Gym this product belongs to
}
