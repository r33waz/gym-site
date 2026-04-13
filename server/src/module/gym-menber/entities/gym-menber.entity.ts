import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { User } from '../../user/entities/user.entity';
import { Gym } from '../../gym/entities/gym.entity';
import { GYM_ROLE } from '../../../constant/enum';

@Entity()
/**
 * Represents a gym membership for a user.
 * Links user to gym with role (e.g., member/trainer) and active status.
 *
 * Key Fields: role (GYM_ROLE), isActive
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | User | N:1 @ManyToOne | user (User.gymMemberships -> GymMember) |
 * | Gym | N:1 @ManyToOne | gym (Gym.members -> GymMember) |
 */
export class GymMember extends BaseEntity {
  /**
   * Many memberships belong to one user
   */
  @ManyToOne(() => User, (user) => user.gymMemberships)
  user!: User;

  /**
   * Many memberships belong to one gym
   */
  @ManyToOne(() => Gym, (gym) => gym.members)
  gym!: Gym;

  /**
   * Role of user inside gym (admin, trainer, member)
   */
  @Column({
    type: 'enum',
    enum: GYM_ROLE, // Pass the enum object itself
    default: GYM_ROLE.MEMBER, // Set the default value
  })
  role!: GYM_ROLE; // Role in gym (MEMBER, TRAINER, etc.)

  @Column({ default: true })
  isActive!: boolean;
}
