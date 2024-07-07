import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './infrastructure/filter/http-exception.filter';
import { PrismaService } from './infrastructure/database/prisma';

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(bodyParser.json({ limit: '50mb' })); // jsonをパースする際のlimitを設定
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // urlencodeされたボディをパースする際のlimitを設定
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  console.log('the server is starting @ firebase');
  return app.init();
};

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);
