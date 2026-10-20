import { registerAs } from '@nestjs/config';

export default () => ({
  app: {
    env: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '4000', 10),
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    isProduction: process.env.NODE_ENV === 'production',
  },

  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'saas_field_service_db',
    logging: process.env.DB_LOGGING === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true', // false in production
  },

  jwt: {
    // Staff / ERP auth secrets
    staffAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'change-me-staff-secret',
    staffAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiresDays: parseInt(process.env.JWT_REFRESH_EXPIRES_DAYS ?? '30', 10),

    // Customer / Marketplace auth secrets (isolated)
    customerAccessSecret: process.env.CUSTOMER_JWT_ACCESS_SECRET ?? 'change-me-customer-secret',
    customerAccessExpiresIn: process.env.CUSTOMER_JWT_EXPIRES_IN ?? '15m',
  },

  cookies: {
    domain: process.env.COOKIE_DOMAIN ?? 'localhost',
    secure: process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
    sameSite: (process.env.COOKIE_SAME_SITE ?? 'lax') as 'lax' | 'strict' | 'none',

    // Default: 15 minutes (900,000 ms)
    accessTokenMaxAge: parseInt(process.env.ACCESS_TOKEN_MAX_AGE_MS ?? '900000', 10),

    // Default: 30 days (2,592,000,000 ms)
    refreshTokenMaxAge: parseInt(process.env.REFRESH_TOKEN_MAX_AGE_MS ?? '2592000000', 10),

    refreshPath: process.env.REFRESH_COOKIE_PATH ?? '/auth/refresh',
  },
});
