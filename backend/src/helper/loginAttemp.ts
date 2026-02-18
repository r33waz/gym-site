import { Repository } from "typeorm";
import { Auth } from "../entities/auth.entity";

export class LoginAttemptHelper {
  constructor(private authRepo: Repository<Auth>) {}

  async loginAttempt(auth: Auth) {
    auth.login_attempts += 1;

    if (auth.login_attempts >= 5) {
      auth.is_active = false; // lock account
    }

    await this.authRepo.save(auth);
  }
}
