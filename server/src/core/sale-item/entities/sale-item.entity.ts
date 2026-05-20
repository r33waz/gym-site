import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { Sale } from '../../sale/entities/sale.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
@Index('IDX_SALE_ITEM_SALE', ['sale'])
@Index('IDX_SALE_ITEM_PRODUCT', ['product'])
/**
 * Represents a single line item within a sale transaction.
 * Captures product, quantity, price, and link to the parent sale.
 *
 * Key Fields: quantity, price
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | Sale | N:1 @ManyToOne | sale (Sale.items -> SaleItem) |
 * | Product | N:1 @ManyToOne | product |
 * | Gym | N:1 foreign | via Sale |
 */
export class SaleItem extends BaseEntity {
  @ManyToOne(() => Sale, (sale) => sale.items)
  sale!: Sale;

  @ManyToOne(() => Product)
  product!: Product;

  @Column()
  quantity!: number;

  @Column('decimal')
  price!: number;
}
