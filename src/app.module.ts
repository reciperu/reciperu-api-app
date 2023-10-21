import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { PrismaModule } from './prisma/prisma.module';
import { FirebaseModule } from './firebase/firebase.module';
// import { SpaceModule } from './space/space.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';

import {
  UserController,
  RecipeBookController,
  RecipeController,
  InvitationController,
  MenuController,
  MediaController,
} from './controllers';
import { MenuPresenter } from './controllers/menu/menu.presenter';
// import { SetCurrentUserMiddleware } from './setCurrentUser.middleware';

@Module({
  imports: [FirebaseModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [
    UserController,
    RecipeController,
    RecipeBookController,
    InvitationController,
    MenuController,
    MediaController,
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
// configure(consumer: MiddlewareConsumer) {
//   consumer
//     .apply(SetCurrentUserMiddleware)
//     .exclude({ path: 'users', method: RequestMethod.POST })
//     .forRoutes('*');
// }
// }
