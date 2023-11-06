import { Module, DynamicModule } from '@nestjs/common';
import { CheckUserUseCase, CreateSpaceUseCase, UpdateUserUseCase } from './';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { FirebaseModule } from 'src/infrastructure/firebase/firebase.module';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import {
  PrismaSpaceRepository,
  PrismaUserRepository,
} from 'src/infrastructure/database/prisma';
import { type } from 'os';

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
  static readonly UPDATE_USER_USE_CASE = 'UPDATE_USER_USE_CASE';
  static readonly CREATE_SPACE_USE_CASE = 'CREATE_SPACE_USE_CASE';
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
        {
          inject: [PrismaUserRepository],
          provide: UseCaseProxyModule.UPDATE_USER_USE_CASE,
          useFactory: (userRepository: PrismaUserRepository) => {
            return new UseCaseProxy(new UpdateUserUseCase(userRepository));
          },
        },
        {
          inject: [PrismaSpaceRepository],
          provide: UseCaseProxyModule.CREATE_SPACE_USE_CASE,
          useFactory: (spaceRepository: PrismaSpaceRepository) => {
            return new UseCaseProxy(new CreateSpaceUseCase(spaceRepository));
          },
        },
      ],
      exports: [
        UseCaseProxyModule.CHECK_USER_USE_CASE,
        UseCaseProxyModule.UPDATE_USER_USE_CASE,
        UseCaseProxyModule.CREATE_SPACE_USE_CASE,
      ],
    };
  }
}
