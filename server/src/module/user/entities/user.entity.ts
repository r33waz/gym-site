import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { Auth } from '../../auth/entities/auth.entity';
import { Gym } from '../../gym/entities/gym.entity';
import { GymMember } from '../../gym-menber/entities/gym-menber.entity';
import { UserMembership } from '../../user-member-ship/entities/user-member-ship.entity';

@Entity()
@Index('IDX_USER_USERNAME', ['username'])
/**
 * Represents a user in the gym management system.
 * Stores personal details, authentication link, owned gyms, memberships, and subscriptions.
 * Note: Duplicate @Entity() in original - preserved as-is.
 *
 * Key Fields: username, first_name, middle_name, last_name
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | Auth | 1:1 @OneToOne | auth |
 * | Gym | 1:N @OneToMany | ownedGyms (Gym.owner <- User) |
 * | GymMember | 1:N @OneToMany | gymMemberships (GymMember.user <- User) |P
 * | UserMembership | 1:N @OneToMany | subscriptions (UserMembership.user <- User) |
 * | Employee | N:1 foreign | Employee.user <- User |
 * | Attendance | N:1 foreign | Attendance.user <- User |
 * | Payment | N:1 foreign | Payment.user <- User |
 * | Sale | N:1 foreign | Sale.soldBy <- User |
 * | Leave | N:1 foreign | Leave.user <- User |
 */
export class User extends BaseEntity {
  @Column()
  username!: string; // Unique username for login

  @Column()
  first_name!: string; // User's first name

  @Column()
  middle_name?: string; // Middle name (optional)

  @Column()
  last_name!: string; // Last name

  /**
   * One user has one auth record (email/password)
   */
  @OneToOne(() => Auth, (auth) => auth.user)
  auth!: Auth;

  /**
   * One user can own multiple gyms
   */
  @OneToMany(() => Gym, (gym) => gym.owner)
  ownedGyms!: Gym[];

  /**
   * User belongs to many gyms via GymMember
   */
  @OneToMany(() => GymMember, (member) => member.user)
  gymMemberships!: GymMember[];

  /**
   * User can have multiple subscriptions (packages)
   */
  @OneToMany(() => UserMembership, (sub) => sub.user)
  subscriptions!: UserMembership[];
}
