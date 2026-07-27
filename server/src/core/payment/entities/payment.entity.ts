import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { User } from '../../user/entities/user.entity';
import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
} from '../../../constant/enum/common.enum';
import { Gym } from '../../gym/entities/gym.entity';

@Entity()
@Index('IDX_PAYMENT_USER', ['user'])
@Index('IDX_PAYMENT_GYM', ['gym'])
@Index('IDX_PAYMENT_TYPE', ['type'])
@Index('IDX_PAYMENT_STATUS', ['status'])
/**
 * Represents payment transactions.
 * Amount, method, status, type; linked to user/gym.
 *
 * Key Fields: amount, method (enum), status (enum), type (enum), referenceId, date
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | User | N:1 @ManyToOne | user |
 * | Gym | N:1 @ManyToOne | gym |
 * Indexes: user+status, gym+date for queries.
 */
export class Payment extends BaseEntity {
  /**
   * Who made the payment
   */
  @ManyToOne(() => User)
  user!: User;
  /**
   * Gym where payment is made
   */
  @ManyToOne(() => Gym)
  gym!: Gym;

  @Column('decimal')
  amount!: number;

  @Column({ type: 'enum', enum: PAYMENT_METHOD })
  method!: string;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: PAYMENT_STATUS.PENDING,
  })
  status!: string;

  /**
   * Defines what this payment is for
   */
  @Column({ type: 'enum', enum: PAYMENT_TYPE })
  type!: string;
  /**
   * Links to Sale.id or UserMembership.id
   */
  @Column({ nullable: true })
  referenceId!: string; // links to membership or sale

  @Column()
  date!: Date;
}
