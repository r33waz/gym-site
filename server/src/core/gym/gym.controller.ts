import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import type { AuthRequest } from '../../interface/auth.interface';
import { ApiResponse } from '../../constant/interface/api.response';
import { Gym } from './entities/gym.entity';
import { HTTP_CODE } from '../../constant/enum/common.enum';
import { successMessage } from '../../constant/response.message';

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post('/create')
  async create(
    @Body() createGymDto: CreateGymDto,
    @Req() req: AuthRequest,
  ): Promise<ApiResponse> {
    await this.gymService.createGym(createGymDto, req.user);
    return {
      success: true,
      status: HTTP_CODE.SUCCESS,
      message: successMessage.gym.gymCreate,
    } satisfies ApiResponse;
  }

  @Get('/list')
  findAll() {
    return this.gymService.findAllGym();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Gym>> {
    const gym = await this.gymService.findById(id);

    return {
      success: true,
      status: HTTP_CODE.SUCCESS,
      data: gym,
    } satisfies ApiResponse<Gym>;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGymDto: UpdateGymDto) {
    return this.gymService.updateGym(+id, updateGymDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    await this.gymService.deleteGym(id);
    return {
      status: HTTP_CODE.SUCCESS,
      success: true,
      message: successMessage.gym.gymDelete,
    } satisfies ApiResponse;
  }
}
