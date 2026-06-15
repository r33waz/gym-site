import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { Gym } from '../../gym/entities/gym.entity';
import { Address } from '../../address/entities/address.entity';
import { GYM_STATUS } from '../../../constant/enum/common.enum';

@Entity('gym_branch')
export class GymBranch extends BaseEntity {
  // gym name shown publicly
  @Column()
  branch_name: string;

  @OneToOne(() => Address, (address) => address.branch_Address)
  @JoinColumn()
  address_details: Address;

  @Column({ type: 'enum', enum: GYM_STATUS, default: GYM_STATUS?.PENDING })
  status: GYM_STATUS;

  // one gym can have the multiple branches
  @ManyToOne(() => Gym, (gym) => gym.gym_branches)
  gym_head_office: Gym;
}
