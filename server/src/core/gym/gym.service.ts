import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { Gym } from './entities/gym.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errorMessage, successMessage } from '../../constant/response.message';
import { GYM_STATUS, HTTP_CODE } from '../../constant/enum/common.enum';
import { User } from '../user/entities/user.entity';
import { ICURRENT_USER } from '../../interface/auth.interface';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepo: Repository<Gym>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async createGym(createGymDto: CreateGymDto, currentUser: ICURRENT_USER) {
    try {
      const { address, city, gymnameEn, gymnameNp, phoneNumer, telNumber } =
        createGymDto;

      const user = await this.userRepo.findOne({
        where: { id: currentUser?.userId },
      });

      if (!user) {
        throw new BadRequestException(errorMessage.user.userNotFound);
      }

      const existingGym = await this.gymRepo.findOne({
        where: {
          gymnameEn,
          gymnameNp,
        },
      });

      if (existingGym) {
        throw new BadRequestException(errorMessage.gym.gymNotFound);
      }

      const newGym = await this.gymRepo.create({
        gymnameEn: gymnameEn,
        gymnameNp: gymnameNp,
        address: address,
        city: city,
        phoneNumer: phoneNumer,
        telNumber: telNumber,
        status: GYM_STATUS.PENDING,
      });

      const savedGym = await this.gymRepo.save(newGym);

      return {
        success: true,
        status: HTTP_CODE.SUCCESS,
        message: successMessage.gym.gymCreate,
      };
    } catch (error) {
      console.log('🚀 ~ GymService ~ createGym ~ error:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      // Unexpected errors
      throw new InternalServerErrorException(errorMessage.serverError);
    }
  }

  findAllGym() {
    return `This action returns all gym`;
  }

  findById(id: number) {
    return `This action returns a #${id} gym`;
  }

  updateGym(id: number, updateGymDto: UpdateGymDto) {
    return `This action updates a #${id} gym`;
  }

  deleteGym(id: number) {
    return `This action removes a #${id} gym`;
  }
}
