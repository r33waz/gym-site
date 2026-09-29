import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * BaseEntity provides the common audit columns shared by every entity in the
 * app.
 *
 * NOTE: This class must NOT be decorated with @Entity(). A decorated class is
 * registered by TypeORM as its own standalone table, which caused it to clash
 * with the concrete entities that extend it (e.g. it was previously declared
 * as the `auth.user_roles` table).
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_At' })
  deletedAt: Date | null;
}