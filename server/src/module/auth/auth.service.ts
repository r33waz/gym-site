import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthtDto } from './dto/create-auth.dto';
import { DataSource, EntityManager, IsNull, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { comparePassword, generatePassword } from '../../utils/password.utils';
import { User } from '../user/entities/user.entity';
import { AuthStatus } from '../../constant/enum/common.enum';
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { LoginHistory } from './entities/login-history.entity';
import { createHash, randomBytes } from 'crypto';
import { StringValue } from 'ms';
import { SwaggerAuth } from '../../shared/decorators/swagger.auth.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    //  injecting the respos as the dependency
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    // injecting the refresh token repo as dependency
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,

    // injecting the loginhistory token repo as dependency
    @InjectRepository(LoginHistory)
    private readonly loginHistoryrepository: Repository<LoginHistory>,
  ) {}

  // has refresh token
  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
  // this created the  both access and refresh token
  private async createTokens(
    auth: Auth,
    userAgent?: string,
    ipAddress?: string,
    manager?: EntityManager,
  ) {
    const accessExpiresIn = this.configService.get<string>('jwt.accessExpiresIn') as StringValue;
    // Generate access token
    const accessToken = await this.jwtService.signAsync(
      {
        sub: auth.user.id,
        authId: auth.id,
      },
      {
        secret: this.configService.getOrThrow<string>('jwt.accessSecret'),
        expiresIn: accessExpiresIn,
      },
    );

    // Generate random refresh token
    const refreshToken = randomBytes(48).toString('hex');

    // Calculate refresh token expiration
    const refreshDays = this.configService.getOrThrow<number>('jwt.refreshExpiresDays');

    const expiresAt = new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000);

    // Use transaction repository when available
    const repository = manager ? manager.getRepository(RefreshToken) : this.refreshTokenRepository;

    const userRefreshToken = repository.create({
      userAuthId: auth.id,
      tokenHash: this.hashToken(refreshToken),
      userAgent: userAgent ?? null,
      ipAddress: ipAddress ?? null,
      expiresAt,
    });

    await repository.save(userRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async recordLogin(
    authId: string,
    isSuccessful: boolean,
    ipAddress?: string,
    userAgent?: string,
    failureReason?: string,
  ) {
    await this.loginHistoryrepository.save(
      this.loginHistoryrepository.create({
        userAuthId: authId,
        isSuccessful,
        ipAddress: ipAddress ?? null,
        userAgent: userAgent ?? null,
        failureReason: failureReason ?? null,
      }),
    );
  }

  // creating user
  async createAccount(createAuthDto: CreateAuthtDto) {
    const email = createAuthDto.email.trim().toLowerCase();
    const username = createAuthDto.username.trim().toLowerCase();
    const existingEmail = await this.authRepository.findOne({ where: { email } });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }


    const hashedPassword = await generatePassword(createAuthDto?.password);

    try {
      return await this.dataSource.transaction(async (manager) => {
        const userRepo = manager.getRepository(User);
        const authRepo = manager.getRepository(Auth);

        const user = userRepo.create({
          firstName: createAuthDto.firstName.trim(),
          middleName: createAuthDto.middleName?.trim() || null,
          lastName: createAuthDto.lastName.trim(),
          phoneNumber: createAuthDto.phoneNumber?.trim() || null,
        });

        const savedUser = await userRepo.save(user);

        const auth = authRepo.create({
          user: savedUser,
          email: createAuthDto.email.trim().toLowerCase(),
          passwordHash: hashedPassword,
          status: AuthStatus.ACTIVE,
        });

        await authRepo.save(auth);

        return {
          message: 'Account created successfully',
        };
      });
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Email or Username already exists');
      }

      throw new InternalServerErrorException('Failed to create account. Changes rolled back.');
    }
  }

  // this is private as to record the user login histoy

  async login(dto: LoginDto, userAgent?: string, ipAddress?: string) {
    const userEmail = dto?.email?.trim().toLocaleLowerCase();

    const auth = await this.authRepository
      .createQueryBuilder('auth')
      .addSelect('auth.passwordHash')
      .leftJoinAndSelect('auth.user', 'user')
      .where('LOWER(auth.email) =:userEmail', { userEmail })
      .getOne();

    if (!auth) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // record inactive account login
    if (auth.status !== AuthStatus.ACTIVE) {
      await this.recordLogin(auth.id, false, ipAddress, userAgent, 'Account inactive');
      throw new UnauthorizedException('Your account is not active');
    }

    // record the invalid password attemp
    const validPassword = await comparePassword(dto.password, auth.passwordHash);

    if (!validPassword) {
      await this.recordLogin(auth.id, false, ipAddress, userAgent, 'Invalid password');
      throw new UnauthorizedException('Invalid email or password');
    }

    auth.lastLoginAt = new Date();

    await this.authRepository.save(auth);

    await this.recordLogin(auth.id, true, ipAddress, userAgent);

    const token = await this.createTokens(auth, userAgent, ipAddress);

    return {
      token,
      message: 'Login SucessFull',
    };
  }

  async refreshToken(oldToken: string, userAgent?: string, ipAddress?: string) {
    const tokenHash = this.hashToken(oldToken);

    return this.dataSource.transaction(async (manager) => {
      const refreshRepository = manager.getRepository(RefreshToken);

      // Find and lock the existing refresh token.
      const token = await refreshRepository
        .createQueryBuilder('token')
        .leftJoinAndSelect('token.userAuth', 'auth')
        .leftJoinAndSelect('auth.user', 'user')
        .where('token.tokenHash = :tokenHash', { tokenHash })
        .setLock('pessimistic_write', undefined, ['token'])
        .getOne();

      // Validate refresh token.
      if (!token || token.revokedAt || token.expiresAt <= new Date()) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      // Validate account.
      if (token.userAuth.status !== AuthStatus.ACTIVE) {
        throw new UnauthorizedException('Account is not active');
      }

      // Revoke old refresh token.
      token.revokedAt = new Date();

      await refreshRepository.save(token);

      // Generate new access and refresh tokens.
      const tokens = await this.createTokens(token.userAuth, userAgent, ipAddress, manager);

      return { tokens };
    });
  }

  @SwaggerAuth()
  async logout(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);

    await this.refreshTokenRepository.update(
      {
        tokenHash,
        revokedAt: IsNull(),
      },
      {
        revokedAt: new Date(),
      },
    );

    return {
      message: 'Logout successful',
    };
  }
}
