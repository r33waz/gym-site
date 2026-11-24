import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { AuthStatus } from '../../../constant/enum/common.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
  constructor(
    configService: ConfigService,

    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies?.access_token ?? null,
      ]),

      ignoreExpiration: false,

      secretOrKey: configService.getOrThrow<string>('jwt.accessSecret'),
    });
  }

  async validate(payload: { sub: string; authId: string }) {
    const auth = await this.authRepository.findOne({
      where: {
        id: payload.authId,
        user: {
          id: payload?.sub,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!auth || auth.status !== AuthStatus.ACTIVE) {
      throw new UnauthorizedException('Invalid or inactive account');
    }

    return {
      id: auth.user.id,
      authId: auth.id,
    };
  }
}
