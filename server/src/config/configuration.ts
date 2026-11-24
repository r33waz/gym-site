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
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? '',
    logging: process.env.DB_LOGGING === 'true',
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiresDays: parseInt(process.env.JWT_REFRESH_EXPIRES_DAYS ?? '30', 10),
  },

  cookies: {
    domain: process.env.COOKIE_DOMAIN || undefined,
    secure: process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
    sameSite: (process.env.COOKIE_SAME_SITE ?? 'lax') as 'lax' | 'strict' | 'none',
    accessTokenMaxAge: parseInt(process.env.ACCESS_TOKEN_MAX_AGE_MS ?? '900000', 10),
    refreshTokenMaxAge: parseInt(process.env.REFRESH_TOKEN_MAX_AGE_MS ?? '2592000000', 10),
    refreshPath: process.env.REFRESH_COOKIE_PATH ?? '/auth',
  },
});
