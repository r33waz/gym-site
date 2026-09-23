import { Injectable } from '@nestjs/common';
import { OTP } from 'otplib';
import { toDataURL } from 'qrcode';
import { User } from '../entities/user.entity';

@Injectable()
export class TwoFactorService {
  constructor(private readonly otpService: OTP) {}

  async generateSecret(user: User) {
    const secret = this.otpService.generateSecret();

    const otpauth = this.otpService.generateURI({
      issuer: 'FieldService',
      label: user.email,
      secret,
    });

    const qrDataUrl = await toDataURL(otpauth);

    return {
      secret,
      qrDataUrl,
    };
  }

  async verify(code: string, secret: string): Promise<boolean> {
    const result = await this.otpService.verify({
      token: code,
      secret,
    });

    return result.valid;
  }
}
