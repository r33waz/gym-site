import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(private readonly dataSource: DataSource) {}

  async executeTransaction<T>(
    work: (manager: EntityManager) => Promise<T>,
    isolationLevel:
      | 'READ UNCOMMITTED'
      | 'READ COMMITTED'
      | 'REPEATABLE READ'
      | 'SERIALIZABLE' = 'READ COMMITTED',
  ): Promise<T> {
    return this.dataSource.transaction(isolationLevel, async (manager) => {
      return work(manager);
    });
  }
}
