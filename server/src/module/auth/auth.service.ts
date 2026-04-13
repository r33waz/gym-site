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
    console.log(
      '🚀 ~ AuthService ~ login ~ email, password, username :',
      email,
      password,
    );

    const query = this.authRepo
      .createQueryBuilder('auth')
      .leftJoin('auth.user', 'user')
      .where('auth.email = :email OR auth.username = :email', {
        email,
      })
      .addSelect(['user.role']);

    const user = await query.getOne();

    if (!user) {
      throw new UnauthorizedException(errorMessage?.invalidCredentials);
    }

    const matchedPassword = comparePassword(password, user.password);

    if (!matchedPassword) {
      throw new UnauthorizedException(errorMessage?.invalidCredentials);
    }

    const accessToken = this.jwtService.sign(user, {
      secret: process.env.ACCESS_SECRET_KEY,
      expiresIn: this.ACCESS_EXPIRES,
    });

    const refreshToken = this.jwtService.sign(user, {
      secret: process.env.REFRESH_SECRET_KEY,
      expiresIn: this.REFRESH_EXPIRES,
    });

    return { accessToken, refreshToken };
  }
}
