import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // It handles the cookies
  app.use(cookieParser());
  // useGlobalPipes ---- Apply this validation to ALL routes in app
  // useGlobalPipes ---- This enables class-validator rules in your DTOs.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(Number(process.env.PORT) ?? 3000);
}
bootstrap();
