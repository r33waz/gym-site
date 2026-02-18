import { Repository } from "typeorm";
import { HTTP_CODE } from "../../constant/enum";
import { errorMessage } from "../../constant/response.message";
import { ILoginDto } from "../../DTO/auth.entity.dto";
import { Auth } from "../../entities/auth.entity";
import { LoginAttemptHelper } from "../../helper/loginAttemp";
import { comparePassword } from "../../utils/password.utils";

export class UserService {
  private authRepo: Repository<Auth>;

  constructor(authRepo: Repository<Auth>) {
    this.authRepo = authRepo;
  }

  async loginService(req: ILoginDto) {
    const { email, password, username } = req;

    // Find auth record by email OR username
    const auth = await this.authRepo
      .createQueryBuilder("auth")
      .leftJoinAndSelect("auth.user", "user")
      .where("auth.email = :email OR user.username = :username", {
        email,
        username,
      })
      .getOne();

    if (!auth || !(await comparePassword(password, auth.password))) {
      if (auth) {
        await new LoginAttemptHelper(this.authRepo).loginAttempt(auth);
      }
      throw {
        status: HTTP_CODE?.BAD_REQUEST,
        message: errorMessage.invalidCredentials,
      };
    }

    // Reset login attempts on successful login
    auth.login_attempts = 0;
    await this.authRepo.save(auth);

    return {
      id: auth.user.id,
      role: auth.user.role,
      email: auth.email, // <-- from Auth table
      username: auth.user.username,
    }; // return the linked user
  }
}
