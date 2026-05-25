import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'timestamp with time zone' })
  created_At?: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_At?: Date;
}
