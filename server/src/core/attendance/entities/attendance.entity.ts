import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { User } from '../../user/entities/user.entity';
import { GymMember } from '../../gym-member/entities/gym-member.entity';

@Entity()
@Index('IDX_ATTENDANCE_USER_GYM_DATE', ['user', 'gym', 'checkIn'])
/**
 * Represents a member's or employee's attendance record at a gym.
 * Records check-in and optional check-out times per user and gym.
 *
 * Key Fields: checkIn, checkOut
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | User | N:1 @ManyToOne | user |
 * | Gym | N:1 @ManyToOne | gym |
 * | MembershipPackage | N:1 @ManyToOne | package |
 * Indexes: user+gym+checkIn for fast lookups.
 */
export class Attendance extends BaseEntity {
@ManyToOne(() => User)
  user!: User; // User attending (member/employee)

  @ManyToOne(() => GymMember)
  gym!: GymMember; // Gym attended

  @Column()
  checkIn!: Date; // Check-in time

  @Column({ nullable: true })
  checkOut!: Date; // Check-out time (optional)
}
