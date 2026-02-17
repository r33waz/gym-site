import { Column, OneToOne } from "typeorm";
import { BaseEntity } from "../shared/baseEntity";
import { Auth } from "./auth.entity";

export class User extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

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

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;
}
