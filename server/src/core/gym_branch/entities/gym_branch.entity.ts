import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';
import { Gym } from '../../gym/entities/gym.entity';

@Entity('gym_branch')
export class GymBranch extends BaseEntity {
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

  @ManyToOne(() => Gym, (gym) => gym.branches, {
    onDelete: 'CASCADE',
  })
  gym: Gym;
}
