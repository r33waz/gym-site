import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';

export const getAccessCookieOptions = (config: ConfigService): CookieOptions => ({
  httpOnly: true,
  secure: config.get<boolean>('cookies.secure', false),
  sameSite: config.get<'lax' | 'strict' | 'none'>('cookies.sameSite', 'lax'),
  domain: config.get<string | undefined>('cookies.domain'),
  path: '/',
  maxAge: config.get<number>('cookies.accessTokenMaxAge', 900000),
});

export const getRefreshCookieOptions = (config: ConfigService): CookieOptions => ({
  httpOnly: true,
  secure: config.get<boolean>('cookies.secure', false),
  sameSite: config.get<'lax' | 'strict' | 'none'>('cookies.sameSite', 'lax'),
  domain: config.get<string | undefined>('cookies.domain'),
  path: config.get<string>('cookies.refreshPath', '/auth'),
  maxAge: config.get<number>('cookies.refreshTokenMaxAge', 2592000000),
});

export const getAccessCookieClearOptions = (config: ConfigService): CookieOptions => {
  const { maxAge, ...options } = getAccessCookieOptions(config);
  return options;
};

export const getRefreshCookieClearOptions = (config: ConfigService): CookieOptions => {
  const { maxAge, ...options } = getRefreshCookieOptions(config);
  return options;
};
