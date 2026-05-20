import { Entity, Column, ManyToOne, OneToMany, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { GymMember } from '../../gym-member/entities/gym-member.entity';
import { BaseEntity } from '../../../shared/baseEntity';
import { Product } from '../../product/entities/product.entity';

@Entity('gym')
@Index('IDX_GYM_NAME', ['name']) // fast search by gym name
@Index('IDX_GYM_CITY', ['city']) // filtering gyms by location
export class Gym extends BaseEntity {
  @Column()
  name: string;
  // gym name shown publicly

  @Column()
  address: string;
  // full address of gym

  @Column()
  city: string;
  // city for filtering/search

  @Column()
  country: string;
  // country for multi-region SaaS

  @Column('text', { array: true, nullable: true })
  documents?: string[];
  // legal documents, licenses, etc.

  @Column({ default: true })
  isActive: boolean;
  // gym active/inactive status

  @ManyToOne(() => User, (user) => user.ownedGyms, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  owner: User;
  // user who created this gym (1 gym → 1 owner)

  @OneToMany(() => GymMember, (gm) => gm.gym)
  members: GymMember[];
  // all users linked to this gym

  @OneToMany(() => Product, (product) => product.gym)
  products: Product[];
}
