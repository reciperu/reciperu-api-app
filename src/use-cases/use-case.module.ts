import { Module, DynamicModule } from '@nestjs/common';
import {
  CheckUserUseCase,
  UpdateUserUseCase,
  CreateRecipesUseCase,
  GetRecipeBookUseCase,
  CreateRecipeUseCase,
  GetRecipeDetailUseCase,
  UpdateRecipeBookUseCase,
  UpdateRecipeUseCase,
  InvitationRecipeBookUseCase,
} from './';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { FirebaseModule } from 'src/infrastructure/firebase/firebase.module';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import {
  PrismaUserRepository,
  PrismaRecipeRepository,
  PrismaRecipeBookRepository,
  PrismaRecipeBookInvitationRepository,
} from 'src/infrastructure/database/prisma';

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
  static readonly CREATE_RECIPES_USE_CASE = 'CREATE_RECIPES_USE_CASE';
  static readonly GET_RECIPE_BOOK_USE_CASE = 'GET_RECIPE_BOOK_USE_CASE';
  static readonly UPDATE_RECIPE_BOOK_USE_CASE = 'UPDATE_RECIPE_BOOK_USE_CASE';
  static readonly CREATE_RECIPE_USE_CASE = 'CREATE_RECIPE_USE_CASE';
  static readonly UPDATE_RECIPE_USE_CASE = 'UPDATE_RECIPE_USE_CASE';
  static readonly GET_RECIPE_DETAIL_USE_CASE = 'GET_RECIPE_DETAIL_USE_CASE';
  static readonly INVITATION_RECIPE_BOOK_USE_CASE =
    'INVITATION_RECIPE_BOOK_USE_CASE';
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
          inject: [PrismaRecipeRepository],
          provide: UseCaseProxyModule.CREATE_RECIPES_USE_CASE,
          useFactory: (recipeRepository: PrismaRecipeRepository) => {
            return new UseCaseProxy(new CreateRecipesUseCase(recipeRepository));
          },
        },
        {
          inject: [PrismaRecipeBookRepository],
          provide: UseCaseProxyModule.GET_RECIPE_BOOK_USE_CASE,
          useFactory: (recipeBookRepository: PrismaRecipeBookRepository) => {
            return new UseCaseProxy(
              new GetRecipeBookUseCase(recipeBookRepository),
            );
          },
        },
        {
          inject: [PrismaRecipeBookRepository, PrismaUserRepository],
          provide: UseCaseProxyModule.UPDATE_RECIPE_BOOK_USE_CASE,
          useFactory: (
            recipeBookRepository: PrismaRecipeBookRepository,
            userRepository: PrismaUserRepository,
          ) => {
            return new UseCaseProxy(
              new UpdateRecipeBookUseCase(recipeBookRepository, userRepository),
            );
          },
        },
        {
          inject: [PrismaRecipeRepository],
          provide: UseCaseProxyModule.CREATE_RECIPE_USE_CASE,
          useFactory: (recipeRepository: PrismaRecipeRepository) =>
            new UseCaseProxy(new CreateRecipeUseCase(recipeRepository)),
        },
        {
          inject: [PrismaRecipeRepository],
          provide: UseCaseProxyModule.UPDATE_RECIPE_USE_CASE,
          useFactory: (recipeRepository: PrismaRecipeRepository) =>
            new UseCaseProxy(new UpdateRecipeUseCase(recipeRepository)),
        },
        {
          inject: [PrismaRecipeRepository],
          provide: UseCaseProxyModule.GET_RECIPE_DETAIL_USE_CASE,
          useFactory: (recipeRepository: PrismaRecipeRepository) =>
            new UseCaseProxy(new GetRecipeDetailUseCase(recipeRepository)),
        },
        {
          inject: [PrismaRecipeBookInvitationRepository],
          provide: UseCaseProxyModule.INVITATION_RECIPE_BOOK_USE_CASE,
          useFactory: (
            recipeBookInvitationRepository: PrismaRecipeBookInvitationRepository,
          ) =>
            new UseCaseProxy(
              new InvitationRecipeBookUseCase(recipeBookInvitationRepository),
            ),
        },
      ],
      exports: [
        UseCaseProxyModule.CHECK_USER_USE_CASE,
        UseCaseProxyModule.UPDATE_USER_USE_CASE,
        UseCaseProxyModule.CREATE_RECIPES_USE_CASE,
        UseCaseProxyModule.GET_RECIPE_BOOK_USE_CASE,
        UseCaseProxyModule.UPDATE_RECIPE_BOOK_USE_CASE,
        UseCaseProxyModule.CREATE_RECIPE_USE_CASE,
        UseCaseProxyModule.UPDATE_RECIPE_USE_CASE,
        UseCaseProxyModule.GET_RECIPE_DETAIL_USE_CASE,
        UseCaseProxyModule.INVITATION_RECIPE_BOOK_USE_CASE,
      ],
    };
  }
}
