import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      // argon2d is faster and highly resistant against GPU attacks, which is useful for cryptocurrency
      // argon2i is slower and resistant against tradeoff attacks, which is preferred for password hashing and key derivation
      // argon2id is a hybrid combination of the above, being resistant against GPU and tradeoff attacks
      type: argon2.argon2id,
      //   the amount of the memory to used by the hassing function
      memoryCost: 2 ** 16, //64 MB
      //   it is the amoutn of the passed (iteration) used byt the has function, to increase the strength
      timeCost: 3,
      //   it means the amount of the thered used by the hassing function
      parallelism: 4,
      //   The hash length is the length of the hash function output in bytes
      hashLength: 40,
    });
  }

  async verifyPassword(hashedPassword: string, userPassword: string): Promise<boolean> {
    try {
      return argon2.verify(hashedPassword, userPassword);
    } catch (error) {
      return false;
    }
  }
}
