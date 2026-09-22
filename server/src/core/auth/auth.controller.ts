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
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, UserQueryDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  async create(@Body() signupDto: SignupDto) {
    await this.authService.singup(signupDto);

    return {
      message: 'Account created successfully',
    };
  }
  @Get('/findAllUser')
  @HttpCode(HttpStatus.OK)
  async findAllUser(@Query() query: UserQueryDto) {
    const users = await this.authService.findAllUsers(query);

    return {
      message: 'Account created successfully',
      data: users,
    };
  }
}
