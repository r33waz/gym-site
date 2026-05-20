import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { User } from '../../user/entities/user.entity';
import { Gym } from '../../gym/entities/gym.entity';

@Entity()
/**
 * Represents an employee associated with a gym.
 * Links a user to their gym, position, and salary details.
 *
 * Key Fields: position, salary
 *
 * Row Connections:
 * | Related Entity | Relation Type | Description |
 * |----------------|---------------|-------------|
 * | User | N:1 @ManyToOne | user |
 * | Gym | N:1 @ManyToOne | gym |
 */
export class Employee extends BaseEntity {
@ManyToOne(() => User)
  user!: User; // Associated user account

  @ManyToOne(() => Gym)
  gym!: Gym; // Gym where employed

  @Column()
  position!: string; // Job title or position

  @Column('decimal')
  salary!: number; // Monthly or annual salary
}
