import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '../entities/auth_refresh.token.entity';
import { LessThan, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interface';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  //   this fucntion creates the JWT access token from the user information
  signinAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  //   this service verfies the access token
  verifyAccessToken(token: string): JwtPayload {
    return this.jwtService.verify<JwtPayload>(token);
  }

  //   generateNewRefreshToken
  async issueNewrefreshToken(
    userId: string,
    meta?: { userAgent?: string; ipAddress?: string },
  ): Promise<{ raw: string; entity: RefreshToken }> {
    const rawToken = randomBytes(64).toString('hex');
    const tokenHashed = this.hashToken(rawToken);

    // Compute expiry from config.
    const days = this.config.get<number>('jwt.refreshExpiresDays', 30);
    // 1 day
    // = 24 hours
    // = 24 × 60 minutes
    // = 24 × 60 × 60 seconds
    // = 24 × 60 × 60 × 1000 milliseconds
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    // create prepares the entity in the memory
    const refreshToken = await this.refreshTokenRepo.create({
      id:userId,
      tokenHash: tokenHashed,
      expiresAt,
      userAgent: meta?.userAgent ?? null,
      ipAddress: meta?.ipAddress ?? null,
    });
    // save actually writed the value in the database
    const saveRefreshToken = await this.refreshTokenRepo.save(refreshToken);

    return { raw: rawToken, entity: saveRefreshToken };
  }

  //   this function verif the refreshToken
  async verifyRefreshToken(raw: string): Promise<boolean> {
    const hashedToken = this.hashToken(raw);
    const row = await this.refreshTokenRepo.findOne({ where: { tokenHash: hashedToken } });
    if (!row) return false;
    if (row.revokedAt) return false;
    if (row.expiresAt < new Date()) return false;
    return true;
  }

  // this function removed the refresh token one at a time

  async revokeRefreshToken(raw: string): Promise<void> {
    const hashedToken = this.hashToken(raw);
    await this.refreshTokenRepo.update({ tokenHash: hashedToken }, { revokedAt: new Date() });
  }

  // revoke all the token at once while the user do logout from alll device
  async revokeAllrefreshToken(userId: string): Promise<void> {
    await this.refreshTokenRepo.update({ id: userId }, { revokedAt: new Date() });
  }

  //    Delete expired rows — call from a cron job.
  async purgeExpired(): Promise<void> {
    await this.refreshTokenRepo.delete({ expiresAt: LessThan(new Date()) });
  }

  private hashToken(rawToken: string): string {
    return createHash('sha256').update(rawToken).digest('hex');
  }
}
