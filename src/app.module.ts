import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseModule } from './firebase/firebase.module';
import { SpaceModule } from './space/space.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SetCurrentUserMiddleware } from './setCurrentUser.middleware';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    FirebaseModule,
    SpaceModule,
    RecipeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
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
