import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseTransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

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
