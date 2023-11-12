import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global Level의 Pipe 설정 (Built in Pipe)
  // ValidationPipe
  // ParseIntPipe 
  // ParseBoolPipe
  // ParseArrayPipe
  // ParseUUIDPipe
  // DefaultValuePipe
  // app.useGlobalPipes(GlobalPipes);
  await app.listen(3000);
}
bootstrap();