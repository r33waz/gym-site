import { Controller, Get, Head } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  checkHealth() {
    return {
      status: 'ok',
      message: 'Application is running',
      timestamp: new Date().toISOString(),
    };
  }
}
