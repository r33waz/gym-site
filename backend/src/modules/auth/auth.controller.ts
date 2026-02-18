import { Request, Response } from "express";
import { ILoginDto } from "../../DTO/auth.entity.dto";
import AppDataSource from "../../config/db.config";
import { HTTP_CODE } from "../../constant/enum";
import { successMessage } from "../../constant/response.message";
import { Auth } from "../../entities/auth.entity";
import { successResponse } from "../../utils/api-response";
import { genAccesssToken, genRefreshToken, IUser } from "../../utils/jwt.utils";
import { TryCatch } from "../../utils/tryCatch";
import { UserService } from "./auth.service";

// Initialize service once
const authRepo = AppDataSource.getRepository(Auth);
const userService = new UserService(authRepo);

class AuthController {
  // Login endpoint
  login = TryCatch(async (req: Request, res: Response) => {
    const dto: ILoginDto = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };

    const user = await userService.loginService(dto);

    const accessToken = genAccesssToken(user as IUser, process.env.JWT_SECRET!);
    const refreshToken = genRefreshToken(
      user as IUser,
      process.env.JWT_REFRESH_SECRET!,
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Example: returning user data with success message

    return successResponse(HTTP_CODE.SUCCESS, successMessage.login);
  });

  // Logout endpoint
  logout = TryCatch(async (_req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return successResponse(HTTP_CODE.SUCCESS, successMessage.logout);
  });
}

// Export **one instance** of the controller
export const authController = new AuthController();
