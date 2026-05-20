import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Bonus: rejects requests with extra properties
      transform: true, // Bonus: automatically transforms types in DTOs
    }),
  );

  // Logic to handle potential undefined or multiple origins
  const origin = process.env.FORNTEND_URL;

  app.enableCors({
    // We use a regex or string match to be safe regarding trailing slashes
    origin: origin ? origin.replace(/\/$/, '') : false,
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 8000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap()
