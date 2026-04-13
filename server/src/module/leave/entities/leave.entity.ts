import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { User } from '../../user/entities/user.entity';
import { LEAVE_STATUS } from '../../../constant/enum';
import { Gym } from '../../gym/entities/gym.entity';

@Entity()
@Index('IDX_LEAVE_USER_STATUS', ['user', 'status'])
@Index('IDX_LEAVE_GYM_DATE', ['gym', 'startDate'])
/**
 * Represents a leave request for a user (employee/member) at a gym.
 * Includes reason, dates, status (e.g., pending/approved), and gym association.
 *
 * Key Fields: reason, startDate, endDate, status (LEAVE_STATUS)
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | User | N:1 @ManyToOne | user |
 * | Gym | N:1 @ManyToOne | gym |
 * Indexes: user+status, gym+startDate.
 */
export class Leave extends BaseEntity {
@ManyToOne(() => User)
  user!: User; // User requesting leave

  @ManyToOne(() => Gym)
  gym!: Gym; // Associated gym

  @Column()
  reason!: string; // Reason for leave

  @Column()
  startDate!: Date; // Leave start date

  @Column()
  endDate!: Date; // Leave end date

  @Column({ type: 'enum', enum: LEAVE_STATUS, default: LEAVE_STATUS.PENDING })
  status!: string; // Leave status (PENDING, APPROVED, REJECTED)
}
