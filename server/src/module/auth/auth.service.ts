import { ConflictException, Injectable ,InternalServerErrorException} from '@nestjs/common';
import { CreateAuthtDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { generatePassword } from '../../utils/password.utils';
import { User } from '../user/entities/user.entity';
import { AuthStatus } from '../../constant/enum/common.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    //  injecting the respos as the dependency
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  // creating user
  async createAccount(createAuthDto: CreateAuthtDto) {
    const email = createAuthDto.email.trim().toLowerCase();
    const username = createAuthDto.username.trim().toLowerCase();
    const existingEmail = await this.authRepository.findOne({ where: { email } });
    const existingUserName = await this.authRepository.findOne({ where: { username } });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }
    if (existingUserName) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await generatePassword(createAuthDto?.password);

    try {
      await this.dataSource.transaction(async (manager) => {
        const useRepo = manager.getRepository(User);
        const authRepo = manager.getRepository(Auth);

        const user = useRepo.create({
          firstName: createAuthDto?.firstName.trim(),
          middleName: createAuthDto?.middleName.trim() || null,
          lastName: createAuthDto?.lastName?.trim(),
          phoneNumber: createAuthDto?.phoneNumber?.trim() || null,
        });

        const savedUser = await manager.save(User, user);

        const auth = authRepo.create({
          user: savedUser,
          email: createAuthDto?.email,
          username: createAuthDto?.username,
          passwordHash: hashedPassword,
          status: AuthStatus.ACTIVE,
        });

        await manager.save(Auth, auth);
        return { message: 'Account created successfully' };
      });
    } catch (error) {
      if (error.code === '23505') { // '23505' is the PostgreSQL code for unique_violation
      throw new ConflictException('Email or Username already exists');
    }
    
    // Otherwise, throw a proper internal server error so your NestJS global filters catch it
    throw new InternalServerErrorException('Failed to create account. Changes rolled back.', error.message);
  }
    }
  }
}
