import { Module, DynamicModule } from '@nestjs/common';
import { CheckUserUseCase } from './check-user.use-case';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { FirebaseModule } from 'src/infrastructure/firebase/firebase.module';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import { PrismaUserRepository } from 'src/infrastructure/database/prisma/repositories/prisma.user.repository';

export class UseCaseProxy<T> {
  constructor(private readonly useCase: T) {}
  getInstance(): T {
    return this.useCase;
  }
}
@Module({
  imports: [DatabaseModule, FirebaseModule],
})
export class UseCaseProxyModule {
  static readonly CHECK_USER_USE_CASE = 'CHECK_USER_USE_CASE';
  static resister(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [
        {
          inject: [PrismaUserRepository, FirebaseService],
          provide: UseCaseProxyModule.CHECK_USER_USE_CASE,
          useFactory: (
            userRepository: PrismaUserRepository,
            firebaseService: FirebaseService,
          ) => {
            return new UseCaseProxy(
              new CheckUserUseCase(userRepository, firebaseService),
            );
          },
        },
      ],
      exports: [UseCaseProxyModule.CHECK_USER_USE_CASE],
    };
  }
}
