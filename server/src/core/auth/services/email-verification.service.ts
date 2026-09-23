import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);
  constructor(private readonly jwt: JwtService) {}

  private async sendEmail(to: string, subject: string, body: string) {
    this.logger.log(`[email] to=${to} subject="${subject}"`);
    this.logger.debug(body);
  }

  async sendVerificationEmail(user: User): Promise<void> {
    // JWT with a scope marker so it can't be reused for other flows.
    const token = this.jwt.sign({ sub: user.id, scope: 'verify_email' }, { expiresIn: '24h' });
    const link = `/auth/verify-email?token=${token}`;
    await this.sendEmail(user.email, 'Verify your email', `Click: ${link}`);
  }

  async verifyEmailToken(token: string): Promise<string | null> {
    try {
      const payload = this.jwt.verify<{ sub: string; scope: string }>(token);
      if (payload.scope !== 'verify_email') return null;
      return payload.sub;
    } catch {
      return null;
    }
  }

  async sendPasswordResetEmail(user: User): Promise<void> {
    const token = this.jwt.sign({ sub: user.id, scope: 'reset_password' }, { expiresIn: '1h' });
    const link = `/auth/reset-password?token=${token}`;
    await this.sendEmail(user.email, 'Reset your password', `Click: ${link}`);
  }

  async verifyPasswordResetToken(token: string): Promise<string | null> {
    try {
      const payload = this.jwt.verify<{ sub: string; scope: string }>(token);
      if (payload.scope !== 'reset_password') return null;
      return payload.sub;
    } catch {
      return null;
    }
  }
}
