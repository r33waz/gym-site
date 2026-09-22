import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/baseEntity';

@Entity({ schema: 'auth', name: 'roles' })
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 80, unique: true })
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string | null;
}
