import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { dump } from 'js-yaml';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/filter/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(bodyParser.json({ limit: '50mb' })); // jsonをパースする際のlimitを設定
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // urlencodeされたボディをパースする際のlimitを設定
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('reciperu api app')
    .setDescription('API documents')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./openapi.yaml', dump(document, {}));
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
