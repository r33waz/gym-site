import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ILoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { errorMessage } from '../../constant/response.message';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { comparePassword } from '../../utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private authRepo: Repository<Auth>,
  ) {}

  private readonly ACCESS_EXPIRES = '15m';
  private readonly REFRESH_EXPIRES = '7d';

  async login(loginDto: ILoginDto) {
    const { email, password } = loginDto;

    // 1. Fixed the 'user' reserved keyword by using 'u' alias
    // 2. Used leftJoinAndSelect to automatically handle the mapping safely
    const identifier = email;

    const authAccount = await this.authRepo
      .createQueryBuilder('auth')
      .leftJoinAndSelect('auth.user', 'u')
      .where('auth.email = :identifier', { identifier })
      .orWhere('u.username = :identifier', { identifier })
      .getOne();

    if (!authAccount) {
      throw new UnauthorizedException(errorMessage?.invalidCredentials);
    }

    // 3. Compare password
    const matchedPassword = await comparePassword(
      password,
      authAccount.password,
    );
    if (!matchedPassword) {
      throw new UnauthorizedException(errorMessage?.invalidCredentials);
    }

    // 4. SECURITY FIX: Prepare a clean payload.
    // NEVER put the whole 'user' object (password hash) in a JWT.
    const payload = {
      sub: authAccount.id,
      email: authAccount.email,
      role: authAccount?.user?.memberships,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_SECRET_KEY,
      expiresIn: this.ACCESS_EXPIRES,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET_KEY,
      expiresIn: this.REFRESH_EXPIRES,
    });

    return { accessToken, refreshToken };
  }
}
