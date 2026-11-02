import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { configService } from './config/database/database.config';
import { RequestLoggerMiddleware } from './middleware/logger/logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync(configService),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 1000,
          limit: 5,
        },
        {
          name: 'mediun',
          ttl: 10000,
          limit: 5,
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 100,
        },
      ],
      errorMessage: 'Too many requests. Please try again later.',
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes({
      path: '*path',
      method: RequestMethod.ALL,
    });
  }
}
