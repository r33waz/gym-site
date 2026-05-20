import { Request } from 'express';

export interface ICURRENT_USER {
  userId: string;
  email: string;
  username: string;
  systemRole: string;
}

export interface AuthRequest extends Request {
  user: ICURRENT_USER;
}
