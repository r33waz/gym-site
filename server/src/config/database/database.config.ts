import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join, resolve } from 'path';
import * as dotenv from 'dotenv';

/**
 * Load environment variables.
 *
 * Development: .env.development
 * Production:  .env.production
 *
 * On Render, configure production variables in the
 * Render Environment dashboard.
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
 * PostgreSQL options type.
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

  return value.trim();
}

/**
 * Validate PostgreSQL port.
 */
function getDatabasePort(): number {
  const port = Number(getRequiredEnv('DB_PORT'));

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error('DB_PORT must be a valid port between 1 and 65535.');
  }

  return port;
}

/**
 * PostgreSQL configuration.
 *
 * All environments use individual database credentials.
 */
function getDatabaseOptions(): PostgresOptions {
  return {
    type: 'postgres',

    host: getRequiredEnv('DB_HOST'),
    port: getDatabasePort(),

    username: getRequiredEnv('DB_USERNAME'),
    password: getRequiredEnv('DB_PASSWORD'),
    database: getRequiredEnv('DB_NAME'),

    extra: {
      max: Number(process.env.DB_POOL_MAX ?? 10),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },

    // Enable SSL in production when required by your
    // PostgreSQL hosting configuration.
    ...(process.env.DB_SSL === 'true' && {
      ssl: {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
      },
    }),
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
      host: database.host,
      database: database.database,
      nodeEnv: config.get<string>('app.env'),
    });

    return {
      ...database,

      entities: [entitiesPath],
      migrations: [migrationsPath],

      migrationsTableName: 'migrations',

      autoLoadEntities: true,

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
