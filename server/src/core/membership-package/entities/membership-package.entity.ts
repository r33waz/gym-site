import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { UserMembership } from '../../user-member-ship/entities/user-member-ship.entity';
import { Gym } from '../../gym/entities/gym.entity';

@Entity()
@Index('IDX_PACKAGE_GYM', ['gym'])
/**
 * Represents gym membership packages.
 * Name, price, duration; offered by gym, subscribed by users.
 *
 * Key Fields: name, price, durationDays
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | Gym | N:1 @ManyToOne | gym (Gym.packages -> MembershipPackage) |
 * | UserMembership | 1:N @OneToMany | subscriptions |
 * | Attendance | N:1 foreign | Attendance.package <- MembershipPackage |
 */
export class MembershipPackage extends BaseEntity {
  @Column()
  name!: string; // Name of the membership package (e.g., Basic, Premium)

  @Column('decimal')
  price!: number; // Price of the package

  @Column()
  durationDays!: number; // Duration in days
  /**
   * Package belongs to one gym
   */
  @ManyToOne(() => Gym, (gym) => gym.members)
  gym!: Gym;

  /**
   * Package can be used in many subscriptions
   */
  @OneToMany(() => UserMembership, (sub) => sub.package)
  subscriptions!: UserMembership[];
}
