import { Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { GymBranch } from '../../gym_branch/entities/gym_branch.entity';
import { Gym } from '../../gym/entities/gym.entity';

export class Address extends BaseEntity {
  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  ward: string;

  @Column()
  street_name: string;

  @OneToOne(() => GymBranch, (gymBranch) => gymBranch.address_details)
  branch_Address: GymBranch;

  @OneToOne(() => Gym, (gymAddress) => gymAddress.address_details)
  gym_Address: Gym;
}
