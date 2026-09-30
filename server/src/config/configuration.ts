/**
 * Maps environment variables into the application's configuration.
 * Only values that change between environments live here.
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
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'gym_db',
    logging: process.env.DB_LOGGING === 'true',
  },

  jwt: {
    accessSecret: process.env.ACCESS_SECRET_KEY ?? 'change-me',
    refreshSecret: process.env.REFRESH_SECRET_KEY ?? 'change-me',
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
  }
});
