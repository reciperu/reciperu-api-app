import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { FirebaseModule } from './infrastructure/firebase/firebase.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { ControllersModule } from './controllers';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UseCaseProxyModule } from './use-cases/use-case.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { SetCurrentUserMiddleware } from './middleware/setCurrentUser.middleware';
import { FirebaseService } from './infrastructure/firebase/firebase.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { getEnvFilePath } from './functions/getEnvFilePath';

const envFilePath: string = getEnvFilePath(path.resolve(__dirname, '../envs'));

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    FirebaseModule,
    ControllersModule,
    DatabaseModule,
    UseCaseProxyModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    FirebaseService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetCurrentUserMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
