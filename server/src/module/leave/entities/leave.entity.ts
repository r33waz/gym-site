import { LEAVE_STATUS } from "src/constant/enum";
import { User } from "src/module/user/entities/user.entity";
import { BaseEntity } from "src/shared/baseEntity";
import { Column, Entity, ManyToOne } from "typeorm";


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