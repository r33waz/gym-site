import { Column, Entity, Index, OneToOne } from 'typeorm';
import { UserStatus } from '../../../constant/enum/common.enum';
import { Auth } from '../../auth/entities/auth.entity';
import { BaseEntity } from '../../../shared/entity/baseEntity';
@Entity({ name: 'user', schema: 'public' })
@Index('IDX_users_first_name', ['firstName'])
@Index('IDX_users_last_name', ['lastName'])
@Index('IDX_mobile_number', ['phoneNumber'])
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 10,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  middleName?: string | null;

  @Column({
    type: 'varchar',
    length: 10,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phoneNumber: string | null;

  @Column({
    type: 'enum',
    enum: UserStatus,
    enumName: 'user_status_enum',
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;
}
