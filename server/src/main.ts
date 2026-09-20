import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const origin = process.env.FRONTEND_URL;

  app.enableCors({
    origin: origin ? origin.replace(/\/$/, '') : false,
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 8000;

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
