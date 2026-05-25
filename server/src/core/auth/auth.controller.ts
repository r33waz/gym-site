import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILoginDto } from './dto/create-auth.dto';
import type { Response } from 'express';
import { HTTP_CODE } from '../../constant/enum';
import { successMessage } from '../../constant/response.message';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly ACCESS_MAX_AGE = 15 * 60 * 1000;
  private readonly REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

  @Post('login')
  async login(
    @Body() dto: ILoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(dto);

    //  this is for the validation for the cookies  in the browser
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.ACCESS_MAX_AGE,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.REFRESH_MAX_AGE,
    });

    return {
      status: HTTP_CODE.SUCCESS,
      message: successMessage.login,
    };
  }
}
