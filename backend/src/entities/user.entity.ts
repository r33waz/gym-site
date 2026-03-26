import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { USER_ROLE } from "../constant/enum";
import { BaseEntity } from "../shared/baseEntity";
import { Auth } from "./auth.entity";
import { Gym } from "./gym.entity";

@Entity()
@Index("IDX_USER_USERNAME", ["username"])
@Index("IDX_USER_ROLE", ["role"])
@Index("IDX_USER_CONTACT", ["contact_number"])
@Index("IDX_USER_CITY", ["city"])
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

  @Column({ type: "enum", enum: USER_ROLE, default: USER_ROLE.USER })
  role: string;

  @Column()
  contact_number: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  profile_picture: string;

  @OneToOne(() => Auth, (auth) => auth.user, { onDelete: "CASCADE" })
  auth: Auth;

  // User belongs to a Gym
  @ManyToOne(() => Gym, (gym) => gym.users, { onDelete: "SET NULL" })
  gym: Gym;

  // Gyms that this user owns
  @OneToMany(() => Gym, (gym) => gym.owner)
  ownedGyms: Gym[];
}