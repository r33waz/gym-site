import { Injectable } from '@nestjs/common';
import { ILoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: ILoginDto) {
    
  }
}
