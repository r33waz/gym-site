import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';
import { Request } from 'express';
import { ACCESS_TOKEN_COOKIE } from '../../../constant';
import { JwtPayload } from '../interface';
import { UserStatus } from '../../../constant/enum/common.enum';

export class JwtAutnGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,

    // injecting the user repo
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    // injectiion the User role repo
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    //  reading hte access token form the cookies

    const access_token = request.cookies?.[ACCESS_TOKEN_COOKIE];
    if (!access_token) {
      throw new UnauthorizedException('Authentication required');
    }

    let paylaod: JwtPayload;
    try {
      paylaod = this.jwtService.verify<JwtPayload>(access_token, {
        secret: this.config.get<string>('jwt.secret'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    // finding the user

    const user = await this.userRepo.findOne({ where: { id: paylaod?.sub } });
    if (!user) throw new UnauthorizedException('Invalid email or password');
    if (user.status === UserStatus.SUSPENDED)
      throw new UnauthorizedException('Account suspended, Please contact to operator');

    const user_roles = await this.userRoleRepo
      .createQueryBuilder('user_roles')
      .innerJoin('user-roles', 'roles')
      .select('roles.name', 'name')
      .where('user_roles.user_id = :userId', { useId: user?.id })
      .getRawMany<{ name: string }>();

    const roles = user_roles?.map((row) => row.name);
    (request as any).user = {
      id: user.id,
      email: user.email,
      roles,
    };
    return true;
  }
}
