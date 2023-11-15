import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global Level의 Pipe 설정 (Built in Pipe)
  // ValidationPipe
  // ParseIntPipe 
  // ParseBoolPipe
  // ParseArrayPipe
  // ParseUUIDPipe
  // DefaultValuePipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  await app.listen(3000);
}
bootstrap();