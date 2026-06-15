// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { errorMessage } from '../constant/response.message';

// @Injectable()
// export class AuthMiddleware implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request: Request = context.switchToHttp().getRequest();
//     const access_token = request.cookies?.access_token;
//     const refresh_token = request.cookies?.refresh_token;
//     if (!access_token) {
//       throw new UnauthorizedException(errorMessage.auth.authFailed);
//     }

//     if (access_token && !refresh_token) {
//       throw new UnauthorizedException(errorMessage?.auth?.tokenExpired);
//     }

//     try {
//       const payload = await this.jwtService.verify(access_token, {
//         secret: process.env.ACCESS_SECRET_KEY,
//       });

//       request['currentUser'] = payload;
//     } catch (error) {}

//     return true;
//   }
// }

import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../constant/response.message';
import { AuthErrorCode } from '../constant/enum/common.enum';

const publicRoutes = ['/auth/login'];
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // if the public routes mathces the path commoing in the request
    // then middleware directly send the user to the paticular route
    // else check verify and then middleware redirects to the the route
    if (publicRoutes.includes(req.path)) {
      return next();
    }
    const token = req?.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException({
        code: AuthErrorCode.AUTH_REQUIRED,
        message: 'Authentication required',
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_SECRET_KEY,
      });

      req['currentUser'] = payload;
      return next();
    } catch (error) {
      throw new UnauthorizedException({
        code: AuthErrorCode.ACCESS_TOKEN_EXPIRED,
        message: 'Access token expired',
      });
    }
  }
}
