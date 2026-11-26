import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthtDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import {
  ACCESS_COOKIE,
  getAccessCookieOptions,
  getRefreshCookieOptions,
  REFRESH_COOKIE,
} from './utils/auth-cookie.config';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags("Auths-apis")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  async create(@Body() createAuthDto: CreateAuthtDto) {
    const result = await this.authService.createAccount(createAuthDto);
    return {
      message: result.message,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    short: { limit: 5, ttl: 1000 },
    mediun: { limit: 5, ttl: 10000 },
    long: { limit: 100, ttl: 60000 },
  })
  async login(
    @Body() dto: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(dto, request.headers['user-agent'], request.ip);
    console.log("🚀 ~ AuthController ~ login ~ result:", result)

    response.cookie(
      ACCESS_COOKIE,
      result.token.accessToken,
      getAccessCookieOptions(this.configService),
    );

    response.cookie(
      REFRESH_COOKIE,
      result.token.refreshToken,
      getRefreshCookieOptions(this.configService),
    );

    return {
      message: result.message,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request?.cookies?.[REFRESH_COOKIE];
    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    response.clearCookie(ACCESS_COOKIE, getAccessCookieOptions(this.configService));
    response.clearCookie(REFRESH_COOKIE, getAccessCookieOptions(this.configService));

    return {
      message: 'Logout successful',
    };
  }
}
