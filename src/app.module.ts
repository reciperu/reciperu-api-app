import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';

import { FirebaseModule } from './infrastructure/firebase/firebase.module';
// import { SpaceModule } from './space/space.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';

import { MenuPresenter } from './controllers/menu/menu.presenter';
import { ControllersModule } from './controllers';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UseCaseModule } from './use-cases/use-case.module';
// import { SetCurrentUserMiddleware } from './setCurrentUser.middleware';

@Module({
  imports: [FirebaseModule, ControllersModule, DatabaseModule, UseCaseModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
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
