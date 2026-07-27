import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { GymMember } from '../../gym-member/entities/gym-member.entity';
import { BaseEntity } from '../../../shared/baseEntity';
import { Product } from '../../product/entities/product.entity';
import { GYM_STATUS } from '../../../constant/enum/common.enum';
import { GymBranch } from '../../gym_branch/entities/gym_branch.entity';
import { Address } from '../../address/entities/address.entity';
import { MembershipPackage } from '../../membership-package/entities/membership-package.entity';

@Entity('gym')
@Index('IDX_GYM_NAME_ENGLISH', ['gymnameEn']) // fast search by gym name
@Index('IDX_GYM_NAME_NEPALI', ['gymnameNp']) // fast search by gym name
@Index('IDX_GYM_CITY', ['city']) // filtering gyms by location
export class Gym extends BaseEntity {
  @Column()
  gymname: string;
  // gym name shown publicly

  @OneToOne(() => Address, (address) => address.gym_Address)
  @JoinColumn()
  address_details: Address;
  // full address of gym

  @Column()
  phoneNumer: string;

  @Column({ type: 'enum', enum: GYM_STATUS, default: GYM_STATUS.PENDING })
  status: string;

  @Column()
  logo: string;

  @Column()
  trialEndsAt: Date;

  @Column({ default: false })
  isTrialUsed: boolean;
  // prevent multiple trials

  @Column()
  telNumber: string;

  // one gym can have multiple gym
  @OneToMany(() => User, (user) => user.ownedGyms, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'owner_id' })
  ownerId: User;

  // gym can have the muliple branches

  @OneToMany(() => GymBranch, (gymBranch) => gymBranch.gym_head_office)
  @JoinColumn()
  gym_branches: GymBranch[];

  // staff of the gym that role is the owner

  @OneToMany(() => User, (user) => user.gym)
  staff: User[];

  // notifications of for the gym
  @OneToMany(()=>Notification,()=>())
  @JoinColumn("notification_id")
  notification:Notification

  // documents of the gyms
  @OneToMany(()=>Document,()=>())
  @JoinColumn("document_id")

  // membership of the gym
  @OneToMany(()=>MembershipPackage,()=>())
  @JoinColumn("memberShip_id")

  // subscription of the gym
}
