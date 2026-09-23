import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { ConfigService } from '@nestjs/config';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '../../constant/index';
import { SignupDto, UserQueryDto } from './dto/create-auth.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRolesRepo: Repository<UserRole>,

    private readonly passworrdService: PasswordService,

    private readonly tokenServce: TokenService,

    private readonly config: ConfigService,
  ) {}

  async singup(dto: SignupDto): Promise<User> {
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
      withDeleted: true,
    });

    if (existingUser) throw new BadRequestException('Email alredy exist');

    const passwordHash = await this.passworrdService.hashPassword(dto.password);

    const user = this.userRepo.create({
      email: dto?.email,
      phoneNumber: dto?.phoneNumber,
      passwordHash: passwordHash,
      firstName: dto?.firstName,
      middleName: dto?.middleName,
      lastName: dto?.lastName,
    });

    await this.userRepo.save(user);

    return user;
  }

  async findAllUsers(query: UserQueryDto): Promise<{
    data: UserResponseDto[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const {
      page = 1,
      limit = 10,

      search,

      firstName,
      middleName,
      lastName,

      email,
      phoneNumber,

      status,

      emailVerified,
      phoneVerified,
      twoFactorEnabled,
      isPlatformAdmin,

      createdFrom,
      createdTo,

      lastLoginFrom,
      lastLoginTo,

      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const skip = (page - 1) * limit;

    const qb = this.userRepo
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.phoneNumber',

        'user.firstName',
        'user.middleName',
        'user.lastName',

        'user.profilePic',

        'user.status',

        'user.emailVerifiedAt',
        'user.phoneVerifiedAt',

        'user.twoFactorEnabled',
        'user.lastLoginAt',

        'user.isPlatformAdmin',

        'user.createdAt',
        'user.updatedAt',
      ])
      .where('user.deletedAt IS NULL');

    /*
     * General search
     *
     * Searches:
     * first name
     * middle name
     * last name
     * email
     * phone number
     */
    if (search) {
      qb.andWhere(
        `(
          user.firstName ILIKE :search
          OR user.middleName ILIKE :search
          OR user.lastName ILIKE :search
          OR user.email ILIKE :search
          OR user.phoneNumber ILIKE :search
        )`,
        {
          search: `%${search}%`,
        },
      );
    }

    // First name
    if (firstName) {
      qb.andWhere('user.firstName ILIKE :firstName', {
        firstName: `%${firstName}%`,
      });
    }

    // Middle name
    if (middleName) {
      qb.andWhere('user.middleName ILIKE :middleName', {
        middleName: `%${middleName}%`,
      });
    }

    // Last name
    if (lastName) {
      qb.andWhere('user.lastName ILIKE :lastName', {
        lastName: `%${lastName}%`,
      });
    }

    // Email
    if (email) {
      qb.andWhere('user.email ILIKE :email', {
        email: `%${email}%`,
      });
    }

    // Phone number
    if (phoneNumber) {
      qb.andWhere('user.phoneNumber ILIKE :phoneNumber', {
        phoneNumber: `%${phoneNumber}%`,
      });
    }

    // Status
    if (status) {
      qb.andWhere('user.status = :status', {
        status,
      });
    }

    // Email verification
    if (emailVerified !== undefined) {
      if (emailVerified) {
        qb.andWhere('user.emailVerifiedAt IS NOT NULL');
      } else {
        qb.andWhere('user.emailVerifiedAt IS NULL');
      }
    }

    // Phone verification
    if (phoneVerified !== undefined) {
      if (phoneVerified) {
        qb.andWhere('user.phoneVerifiedAt IS NOT NULL');
      } else {
        qb.andWhere('user.phoneVerifiedAt IS NULL');
      }
    }

    // Two-factor authentication
    if (twoFactorEnabled !== undefined) {
      qb.andWhere('user.twoFactorEnabled = :twoFactorEnabled', {
        twoFactorEnabled,
      });
    }

    // Platform admin
    if (isPlatformAdmin !== undefined) {
      qb.andWhere('user.isPlatformAdmin = :isPlatformAdmin', {
        isPlatformAdmin,
      });
    }

    // Created date - from
    if (createdFrom) {
      qb.andWhere('user.createdAt >= :createdFrom', {
        createdFrom,
      });
    }

    // Created date - to
    if (createdTo) {
      qb.andWhere('user.createdAt <= :createdTo', {
        createdTo,
      });
    }

    // Last login - from
    if (lastLoginFrom) {
      qb.andWhere('user.lastLoginAt >= :lastLoginFrom', {
        lastLoginFrom,
      });
    }

    // Last login - to
    if (lastLoginTo) {
      qb.andWhere('user.lastLoginAt <= :lastLoginTo', {
        lastLoginTo,
      });
    }

    /*
     * Whitelisted sorting
     *
     * Never directly use:
     *
     * orderBy(`user.${sortBy}`, sortOrder)
     *
     * because sortBy comes from the client.
     */
    const sortColumns: Record<string, string> = {
      firstName: 'user.firstName',
      lastName: 'user.lastName',
      email: 'user.email',
      createdAt: 'user.createdAt',
      lastLoginAt: 'user.lastLoginAt',
    };

    const sortColumn = sortColumns[sortBy] ?? sortColumns.createdAt;

    qb.orderBy(sortColumn, sortOrder);

    // Pagination
    qb.skip(skip).take(limit);

    const [users, total] = await qb.getManyAndCount();

    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
