import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/interceptor/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ACCESS_COOKIE } from './module/auth/utils/auth-cookie.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port', 3000);

  const frontendUrl = configService.get<string>('app.frontendUrl', 'http://localhost:5173');

  app.setGlobalPrefix('/api/v1');

  app.use(cookieParser());

  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gym-SaaS API')
    .setDescription(
      `
      REST API documentation for the Gym Management SaaS platform.

      This API supports authentication, user management, gym management,
      memberships, attendance, bookings, billing, and other gym operations.
      `,
    )
    .setVersion('1.0.0')
    .addServer('http://localhost:8000/', 'Local environment')
    .addServer('https://gym-site-backend-koik.onrender.com', 'Production')
    .addCookieAuth(
      'access_token',
      {
        type: 'apiKey',
        in: 'cookie',
        name: ACCESS_COOKIE,
        description: 'JWT access token stored in an HTTP-only cookie',
      },
      ACCESS_COOKIE,
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: {
      withCredentials: true,
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
