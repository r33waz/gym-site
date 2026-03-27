import { User } from "src/core/user/entities/user.entity";
import { BaseEntity } from "src/shared/baseEntity";
import { Entity, Column, ManyToOne } from "typeorm";

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