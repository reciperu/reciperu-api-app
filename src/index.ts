import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './infrastructure/filter/http-exception.filter';

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
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());
  console.log('the server is starting @ firebase');
  return app.init();
};

export const api = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    await createNestServer(server);
    server(request, response);
  });
