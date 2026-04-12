
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../shared/baseEntity";
import { User } from "../../user/entities/user.entity";
import { LEAVE_STATUS } from "../../../constant/enum";


@Entity()
export class Leave extends BaseEntity {
  @ManyToOne(() => User, (user) => user.leaves)
  user!: User;

  @Column({ type: "date" })
  startDate!: Date;

  @Column({ type: "date" })
  endDate!: Date;

  @Column({ type: "enum", enum: LEAVE_STATUS, default: LEAVE_STATUS.PENDING })
  status!: LEAVE_STATUS;

  @Column({ nullable: true })
  reason?: string;
}