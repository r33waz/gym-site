import { Column, OneToOne } from "typeorm";
import { BaseEntity } from "../shared/baseEntity";
import { User } from "./user.entity";

export class Auth extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToOne(() => User, (user) => user.auth)
  user: User;

  @Column({ nullable: true })
  last_login?: Date;

  @Column({ default: 0 })
  login_attempts!: number;
}
