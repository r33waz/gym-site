import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join, resolve } from 'path';
import * as dotenv from 'dotenv';

/**
 * Load environment variables.
 *
 * Development:
 *   .env.development
 *
 * Production:
 *   Vercel environment variables are loaded automatically.
 */
dotenv.config({
  path: resolve(process.cwd(), `.env.${process.env.NODE_ENV ?? 'development'}`),
});

/**
 * Entity and migration paths.
 */
const entitiesPath = join(__dirname, '..', '..', 'core', '**', 'entities', '*.entity.{ts,js}');

const migrationsPath = join(__dirname, '..', '..', 'migrations', '*.{ts,js}');

/**
 * Extract PostgreSQL options from TypeORM DataSourceOptions.
 *
 * This avoids importing PostgresConnectionOptions directly.
 */
type PostgresOptions = Extract<DataSourceOptions, { type: 'postgres' }>;

/**
 * Read required environment variables.
 */
function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

/**
 * Database configuration.
 *
 * If DATABASE_URL exists:
 *   Connect to Supabase (production).
 *
 * Otherwise:
 *   Connect using local PostgreSQL credentials (development).
 */
function getDatabaseOptions(): PostgresOptions {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (databaseUrl) {
    return {
      type: 'postgres',
      url: databaseUrl,

      // Tune this based on your serverless workload.
      extra: {
        max: 1,
      },
    };
  }

  const port = Number(getRequiredEnv('DB_PORT'));

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('DB_PORT must be a valid positive integer.');
  }

  return {
    type: 'postgres',

    host: getRequiredEnv('DB_HOST'),
    port,

    username: getRequiredEnv('DB_USERNAME'),
    password: getRequiredEnv('DB_PASSWORD'),
    database: getRequiredEnv('DB_NAME'),

    extra: {
      max: 10,
    },
  };
}

/**
 * NestJS TypeORM configuration.
 */
export const configService: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],

  useFactory: (config: ConfigService): TypeOrmModuleOptions => {
    const database = getDatabaseOptions();

    console.log('Database configuration loaded:', {
      type: 'postgres',
      connectionType: process.env.DATABASE_URL ? 'Supabase' : 'Local PostgreSQL',
      nodeEnv: config.get<string>('app.env'),
    });

    return {
      ...database,

      entities: [entitiesPath],
      migrations: [migrationsPath],

      migrationsTableName: 'migrations',

      // Automatically register entities from NestJS feature modules.
      autoLoadEntities: true,

      // Use migrations instead of automatic schema synchronization.
      synchronize: false,
      migrationsRun: false,

      logging: config.get<boolean>('database.logging', false),
    };
  },
};

/**
 * TypeORM CLI DataSource.
 *
 * Used for migration commands.
 */
const dataSource = new DataSource({
  ...getDatabaseOptions(),

  entities: [entitiesPath],
  migrations: [migrationsPath],

  migrationsTableName: 'migrations',

  synchronize: false,

  logging: process.env.NODE_ENV !== 'production',
});

export default dataSource;
