/**
 * Reads .env variables and returns a typed config object.
 * Only VALUES that differ between environments live here.
 */

export default () => ({
  app: {
    env: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  },

  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER ?? 'fieldservice',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'fieldservice_dev',
    logging: process.env.DB_LOGGING === 'true',
  },

  jwt: {
    secret: process.env.JWT_SECRET ?? 'change-me',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiresDays: parseInt(process.env.JWT_REFRESH_EXPIRES_DAYS ?? '30', 10),
  },

  cookies: {
    domain: process.env.COOKIE_DOMAIN ?? 'localhost',
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: (process.env.COOKIE_SAME_SITE ?? 'lax') as 'lax' | 'strict' | 'none',
    accessTokenMaxAge: parseInt(process.env.ACCESS_TOKEN_MAX_AGE_MS ?? '900000', 10),
    refreshTokenMaxAge: parseInt(process.env.REFRESH_TOKEN_MAX_AGE_MS ?? '2592000000', 10),
    refreshPath: process.env.REFRESH_COOKIE_PATH ?? '/api/auth',
  },
});
