import { Entity, Column, ManyToOne, OneToMany, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { GymMember } from '../../gym-member/entities/gym-member.entity';
import { BaseEntity } from '../../../shared/baseEntity';
import { Product } from '../../product/entities/product.entity';
import { GYM_STATUS } from '../../../constant/enum/common.enum';
import { GymBranch } from '../../gym_branch/entities/gym_branch.entity';

@Entity('gym')
@Index('IDX_GYM_NAME_ENGLISH', ['gymnameEn']) // fast search by gym name
@Index('IDX_GYM_NAME_NEPALI', ['gymnameNp']) // fast search by gym name
@Index('IDX_GYM_CITY', ['city']) // filtering gyms by location
export class Gym extends BaseEntity {
  @Column()
  gymnameEn: string;
  // gym name shown publicly

  @Column()
  gymnameNp: string;

  @Column()
  address: string;
  // full address of gym

  @Column()
  city: string;
  // city for filtering/search

  @Column()
  phoneNumer: String;

  @Column()
  telNumber: string;

  // @Column()
  // country: string;
  // // country for multi-region SaaS

  @Column('text', { array: true, nullable: true })
  documents?: string[];
  // legal documents, licenses, etc.

  @Column({ type: 'enum', enum: GYM_STATUS, default: GYM_STATUS.PENDING })
  status: GYM_STATUS;
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

  @OneToMany(() => GymBranch, (branch) => branch.gym)
  branches: GymBranch[];
}
