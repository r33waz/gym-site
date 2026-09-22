import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
// it reades the metadata that the decorators and put on the class or methods
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../../constant';
import { AuthenticatedUser } from '../interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      // which endpoint
      context.getHandler(),
      //   which controller
      context.getClass(),
    ]);
    // No metadata → allow.
    if (!requiredRoles?.length) return true;

    // extracting the request from the http
    const req = context.switchToHttp().getRequest();
    // the the user have the following this int he reqwuest with typesafety
    const user = req.user as AuthenticatedUser | undefined;

    if (!user)
      throw new ForbiddenException('You do not have the required role to access this resource.');

    const userRoles = user?.roles ?? [];
    const userAllowed = requiredRoles?.some((roles) => userRoles.includes(roles));

    if (!userAllowed) {
      throw new ForbiddenException(`Requires one of: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}
