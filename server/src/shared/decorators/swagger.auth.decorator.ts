import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../module/auth/guard/jwt-auth.guard';

export function SwaggerAuth() {
  return applyDecorators(ApiBearerAuth('access-token'), UseGuards(JwtAuthGuard));
}
