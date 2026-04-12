import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // It handles the cookies
  app.use(cookieParser());
  await app.listen(Number(process.env.PORT) ?? 3000);
}
bootstrap();
