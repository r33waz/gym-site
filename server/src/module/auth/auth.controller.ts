import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  Res,
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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post("signup")
 async create(@Body() createAuthDto: CreateAuthtDto) {
    const result = await this.authService.createAccount(createAuthDto);
     return {
       message: result.message,
     };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(dto, request.headers['user-agent'], request.ip);

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
}
