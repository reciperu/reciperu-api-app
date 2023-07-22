import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeFirebaseAdmin } from './firebase';

async function bootstrap() {
  initializeFirebaseAdmin();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3040);
}
bootstrap();
