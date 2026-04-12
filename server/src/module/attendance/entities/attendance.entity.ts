
import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../shared/baseEntity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Attendance extends BaseEntity {
  @ManyToOne(() => User, (user) => user.attendances)
  user!: User;

  @Column({ type: "date" })
  date!: Date;

  @Column({ type: "time", nullable: true })
  checkIn?: string;

  @Column({ type: "time", nullable: true })
  checkOut?: string;

  @Column({ default: false })
  isPresent!: boolean;
}