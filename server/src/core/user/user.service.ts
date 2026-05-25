import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';

import { User } from './entities/user.entity';
import { Auth } from '../auth/entities/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { generatePassword } from '../../utils/password.utils';
import { TransactionService } from '../shared/transaction.service';
import { GYM_ROLE, SYSTEM_ROLE } from '../../constant/enum';
import { errorMessage, successMessage } from '../../constant/response.message';
import { ICURRENT_USER } from '../../interface/auth.interface';
import { Gym } from '../gym/entities/gym.entity';
import { GymMember } from '../gym-member/entities/gym-member.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly dataSource: DataSource,
  ) {}

  // create user with auth in a transaction
  async createUser(createUserDto: CreateUserDto, currentUser: ICURRENT_USER) {
    const { email, password, systemRole, username, gymId, gymRole } =
      createUserDto;
    console.log(
      '🚀 ~ UserService ~ createUser ~  email, password, systemRole, username, gymId, gymRole:',
      email,
      password,
      systemRole,
      username,
      gymId,
      gymRole,
    );

    try {
      return await this.transactionService.executeTransaction(
        async (manager: EntityManager) => {
          let targetedGymId: Gym | null = null;

          // case when creating a user for a gym, only super admin can do this and they must provide gymId and gymRole
          if (gymId && gymRole) {
            if (currentUser.systemRole !== SYSTEM_ROLE.SUPER_ADMIN) {
              // throw new BadRequestException(errorMessage.gymNotFound);
            }
            targetedGymId = await manager.findOne(Gym, {
              where: { id: gymId },
            });
            if (!targetedGymId) {
              // throw new BadRequestException('Something bad happened', {
              //   description: 'Validation failed',
              //   cause: new Error('Root cause'),
              // });
            }
          } else {
            const gymMember = await manager.findOne(GymMember, {
              where: {
                user: { id: currentUser?.userId },
                role: In([GYM_ROLE.OWNER, GYM_ROLE.MANAGER]),
              },
              relations: ['gym'],
            });

            if (!gymMember) {
              throw new BadRequestException(errorMessage.unauthorized);
            }

            targetedGymId = gymMember.gym;
          }
          // 1. Check if email exists
          const existingAuth = await manager.findOne(Auth, {
            where: { email },
          });

          if (existingAuth) {
            throw new BadRequestException(errorMessage?.user?.emailExist);
          }

          const existingGym = await manager.findOne(Gym, {
            where: { id: createUserDto.gymId },
          });

          if (!existingGym) {
            throw new BadRequestException(errorMessage?.gymNotFound);
          }

          // 2. Create user
          const user = manager.create(User, {
            username,
            systemRole: systemRole as SYSTEM_ROLE,
            gym: targetedGymId,
          });

          const savedUser = await manager.save(user);

          // 3. Hash password
          const hashedPassword = await generatePassword(password);

          // 4. Create auth linked to user
          const auth = manager.create(Auth, {
            email,
            password: hashedPassword,
            user: savedUser,
          });

          const savedAuth = await manager.save(auth);

          // 5. Success response
          return {
            success: true,
            message: successMessage.user.userCreate,
          };
        },
      );
    } catch (error) {
      // Let known errors pass through
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Unexpected errors
      throw new InternalServerErrorException(errorMessage.serverError);
    }
  }
  // get user by id

  // get all users

  // update user

  // delete user
  async deleteUser(userId: string) {
    try {
      const userRepo = this.dataSource.getRepository(User);
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) {
        throw new BadRequestException(errorMessage?.user?.userNotfound);
      }

      await userRepo.remove(user);

      return {
        success: true,
        message: successMessage.user.userDelete,
      };
    } catch (error) {
      // Let known errors pass through
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Unexpected errors
      throw new InternalServerErrorException(errorMessage.serverError);
    }
  }
}
