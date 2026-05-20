import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';

// Ensure env vars are available for TypeORM CLI (migration:generate, etc.)
// NOTE: dotenv should be installed if you want to load .env at runtime.
const dotenv = require('dotenv');
dotenv.config();


// This glob must match actual filesystem locations so TypeORM can build relation metadata.
const entitiesPath = join(
  __dirname,
  '..',
  '..',
  'core',
  '**',
  'entities',
  '*.entity.{ts,js}',
);

const migrationsPath = join(__dirname, '..','..', 'migrations', '*.{ts,js}');
/**
 * Database Configuration
 *
 * Entity Pattern: Looks for all .entity.ts files in libs/database/src/entities/
 * Migration Pattern: Looks for all migration files in libs/database/src/lib/migrations/
 *
 * All entities must be placed in libs/database/src/entities/ and exported from entities/index.ts
 * All migrations must be placed in libs/database/src/lib/migrations/
 */
export const configService: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const config = {
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      nodeEnv: configService.get<string>('NODE_ENV'),
    };

    console.log('🔥 DATABASE CONFIG LOADED:');
    console.table(config);

    return {
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,

      entities: [entitiesPath],
      // migrationsTableName: 'migrations',
      migrations: [migrationsPath],

      autoLoadEntities: true,
      synchronize: false, // Always false for production
      migrationsRun: true, // Auto-run migrations on app startup
      logging: false 
    };
  },
};

/**
 * DataSource for TypeORM CLI migrations
 * Used for: typeorm migration:create, typeorm migration:run, etc.
 */
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [entitiesPath],
  migrationsTableName: 'migrations',
  migrations: [migrationsPath],

  synchronize: false, // ALWAYS false for production
  logging: process.env.NODE_ENV !== 'production',
});
