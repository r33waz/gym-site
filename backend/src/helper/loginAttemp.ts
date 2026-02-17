import { Repository } from "typeorm";
import { Auth } from "../entity/auth.entity";

export class AuthService {
  constructor(private authRepo: Repository<Auth>) {}

  async loginAttempt(auth: Auth) {
    auth.login_attempts += 1;

    if (auth.login_attempts >= 5) {
      auth.is_active = false;
    }

    await this.authRepo.save(auth);
  }
}
