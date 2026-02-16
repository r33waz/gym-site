import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("created_at")
  created_at?: Timestamp;

  @Column("updated_at")
  updated_at?: Timestamp;
}
