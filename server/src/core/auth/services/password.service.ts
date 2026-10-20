import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 12;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async verifyPassword(hashedPassword: string, userPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(userPassword, hashedPassword);
    } catch {
      return false;
    }
  }
}
