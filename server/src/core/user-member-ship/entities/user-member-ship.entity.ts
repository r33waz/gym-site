import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { User } from '../../user/entities/user.entity';
import { MembershipPackage } from '../../membership-package/entities/membership-package.entity';
import { Gym } from '../../gym/entities/gym.entity';

@Entity("")
@Index('IDX_USER_MEMBERSHIP_USER', ['user'])
@Index('IDX_USER_MEMBERSHIP_GYM', ['gym'])
@Index('IDX_USER_MEMBERSHIP_ACTIVE', ['isActive'])
/**
 * Represents an active user subscription to a gym membership package.
 * Tracks user, gym, package, dates, and active status.
 *
 * Key Fields: startDate, endDate, isActive
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | User | N:1 @ManyToOne | user (User.subscriptions -> UserMembership) |
 * | Gym | N:1 @ManyToOne | gym |
 * | MembershipPackage | N:1 @ManyToOne | package (MembershipPackage.subscriptions -> UserMembership) |
 */
export class UserMembership extends BaseEntity {
  /**
   * Subscription belongs to a user
   */
  @ManyToOne(() => User, (user) => user.memberships)
  user!: User;

  /**
   * Subscription belongs to a gym
   */
  @ManyToOne(() => Gym, { nullable: false })
  gym!: Gym;
  /**
   * Subscription uses a package
   */
  @ManyToOne(() => MembershipPackage, (pkg) => pkg.subscriptions)
  package!: MembershipPackage;

  @Column()
  startDate!: Date; // Subscription start date

  @Column()
  endDate!: Date; // Subscription end date

  @Column({ default: true })
  isActive!: boolean; // Subscription active status
}
