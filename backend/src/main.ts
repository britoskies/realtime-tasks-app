import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
