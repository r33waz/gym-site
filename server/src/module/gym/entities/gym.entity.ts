import { User } from 'src/module/user/entities/user.entity';
import { BaseEntity } from 'src/shared/baseEntity';
import { Entity, Column, OneToMany, ManyToOne, Index } from 'typeorm';

@Entity('gyms')
@Index('IDX_GYM_NAME', ['name'])
@Index('IDX_GYM_CITY', ['city'])
export class Gym extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  country!: string;

  @Column({ nullable: true })
  logo?: string;

  // multiple gym documents
  @Column('text', { array: true, nullable: true })
  documents?: string[];

  // gym active status
  @Column({ default: true })
  isActive!: boolean;

  // owner relation
  @ManyToOne(() => User, (user) => user.ownedGyms)
  owner!: User;

  // staff/users in gym
  @OneToMany(() => User, (user) => user.gym)
  users!: User[];
}
