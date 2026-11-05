import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? 'development'}`,
});

const entitiesPath = join(__dirname, '..', '..', 'core', '**', 'entities', '*.entity.{ts,js}');

const migrationsPath = join(__dirname, '..', '..', 'migrations', '*.{ts,js}');

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getDatabaseConfig(config: ConfigService) {
  const password = config.get<string>('database.password');

  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('Database password is missing. Check your environment configuration.');
  }

  return {
    host: config.getOrThrow<string>('database.host'),
    port: config.getOrThrow<number>('database.port'),
    username: config.getOrThrow<string>('database.username'),
    password,
    database: config.getOrThrow<string>('database.name'),
  };
}

export const configService: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],

  useFactory: (config: ConfigService) => {
    const database = getDatabaseConfig(config);

    console.log('Database configuration loaded:', {
      host: database.host,
      port: database.port,
      username: database.username,
      database: database.database,
      passwordDefined: true,
      passwordType: typeof database.password,
      nodeEnv: config.get<string>('app.env'),
    });

    return {
      type: 'postgres',
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

export default new DataSource({
  type: 'postgres',
  host: getRequiredEnv('DB_HOST'),
  port: Number(getRequiredEnv('DB_PORT')),
  username: getRequiredEnv('DB_USERNAME'),
  password: getRequiredEnv('DB_PASSWORD'),
  database: getRequiredEnv('DB_NAME'),
  entities: [entitiesPath],
  migrationsTableName: 'migrations',
  migrations: [migrationsPath],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
