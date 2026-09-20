import { UserResponseDto } from "../dto/user-response.dto";

export interface JwtPayload {
  sub: string; // user UUID
  email: string; // user's email at issue time
  iat?: number; // issued at (auto-added by @nestjs/jwt)
  exp?: number; // expires at (auto-added)
}

export interface AuthResponse {
  accessToken: string;
  user: UserResponseDto;
}

