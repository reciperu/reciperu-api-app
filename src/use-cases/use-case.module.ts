import { Module, DynamicModule } from '@nestjs/common';
import {
  LoginUseCase,
  UpdateUserUseCase,
  CreateRecipesUseCase,
  GetRecipeBookUseCase,
  CreateRecipeUseCase,
  GetRecipeDetailUseCase,
  UpdateRecipeBookUseCase,
  UpdateRecipeUseCase,
  InviteRecipeBookUseCase,
  CreateMenuUseCase,
  UpdateMenuUseCase,
  DeleteMenuUseCase,
  ValidateRecipeBookJoinUseCase,
  GetRecipeListUseCase,
} from './';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { FirebaseModule } from 'src/infrastructure/firebase/firebase.module';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import {
  PrismaUserRepository,
  PrismaRecipeRepository,
  PrismaRecipeBookRepository,
  PrismaRecipeBookInvitationRepository,
  PrismaMenuRepository,
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
  static readonly LOGIN_USE_CASE = 'LOGIN_USE_CASE';
  static readonly UPDATE_USER_USE_CASE = 'UPDATE_USER_USE_CASE';
  static readonly CREATE_RECIPES_USE_CASE = 'CREATE_RECIPES_USE_CASE';
  static readonly GET_RECIPE_BOOK_USE_CASE = 'GET_RECIPE_BOOK_USE_CASE';
  static readonly UPDATE_RECIPE_BOOK_USE_CASE = 'UPDATE_RECIPE_BOOK_USE_CASE';
  static readonly CREATE_RECIPE_USE_CASE = 'CREATE_RECIPE_USE_CASE';
  static readonly UPDATE_RECIPE_USE_CASE = 'UPDATE_RECIPE_USE_CASE';
  static readonly GET_RECIPE_DETAIL_USE_CASE = 'GET_RECIPE_DETAIL_USE_CASE';
  static readonly INVITE_RECIPE_BOOK_USE_CASE = 'INVITE_RECIPE_BOOK_USE_CASE';
  static readonly CREATE_MENU_USE_CASE = 'CREATE_MENU_USE_CASE';
  static readonly UPDATE_MENU_USE_CASE = 'UPDATE_MENU_USE_CASE';
  static readonly DELETE_MENU_USE_CASE = 'DELETE_MENU_USE_CASE';
  static readonly VALIDATE_RECIPE_BOOK_JOIN_USE_CASE =
    'VALIDATE_RECIPE_BOOK_JOIN_USE_CASE';
  static readonly GET_RECIPE_LIST_USE_CASE = 'GET_RECIPE_LIST_USE_CASE';
  static resister(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [
        {
          inject: [PrismaUserRepository, FirebaseService],
          provide: UseCaseProxyModule.LOGIN_USE_CASE,
          useFactory: (
            userRepository: PrismaUserRepository,
            firebaseService: FirebaseService,
          ) => {
            return new UseCaseProxy(
              new LoginUseCase(userRepository, firebaseService),
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
          inject: [PrismaRecipeBookInvitationRepository, PrismaUserRepository],
          provide: UseCaseProxyModule.INVITE_RECIPE_BOOK_USE_CASE,
          useFactory: (
            recipeBookInvitationRepository: PrismaRecipeBookInvitationRepository,
            userRepository: PrismaUserRepository,
          ) =>
            new UseCaseProxy(
              new InviteRecipeBookUseCase(
                recipeBookInvitationRepository,
                userRepository,
              ),
            ),
        },
        {
          inject: [PrismaMenuRepository],
          provide: UseCaseProxyModule.CREATE_MENU_USE_CASE,
          useFactory: (menuRepository: PrismaMenuRepository) =>
            new UseCaseProxy(new CreateMenuUseCase(menuRepository)),
        },
        {
          inject: [PrismaMenuRepository],
          provide: UseCaseProxyModule.UPDATE_MENU_USE_CASE,
          useFactory: (menuRepository: PrismaMenuRepository) =>
            new UseCaseProxy(new UpdateMenuUseCase(menuRepository)),
        },
        {
          inject: [PrismaMenuRepository],
          provide: UseCaseProxyModule.DELETE_MENU_USE_CASE,
          useFactory: (menuRepository: PrismaMenuRepository) =>
            new UseCaseProxy(new DeleteMenuUseCase(menuRepository)),
        },
        {
          inject: [PrismaRecipeBookInvitationRepository, PrismaUserRepository],
          provide: UseCaseProxyModule.VALIDATE_RECIPE_BOOK_JOIN_USE_CASE,
          useFactory: (
            recipeBookInvitationRepository: PrismaRecipeBookInvitationRepository,
            userRepository: PrismaUserRepository,
          ) =>
            new UseCaseProxy(
              new ValidateRecipeBookJoinUseCase(
                recipeBookInvitationRepository,
                userRepository,
              ),
            ),
        },
        {
          inject: [PrismaRecipeRepository],
          provide: UseCaseProxyModule.GET_RECIPE_LIST_USE_CASE,
          useFactory: (recipeRepository: PrismaRecipeRepository) =>
            new UseCaseProxy(new GetRecipeListUseCase(recipeRepository)),
        },
      ],
      exports: [
        UseCaseProxyModule.LOGIN_USE_CASE,
        UseCaseProxyModule.UPDATE_USER_USE_CASE,
        UseCaseProxyModule.CREATE_RECIPES_USE_CASE,
        UseCaseProxyModule.GET_RECIPE_BOOK_USE_CASE,
        UseCaseProxyModule.UPDATE_RECIPE_BOOK_USE_CASE,
        UseCaseProxyModule.CREATE_RECIPE_USE_CASE,
        UseCaseProxyModule.UPDATE_RECIPE_USE_CASE,
        UseCaseProxyModule.GET_RECIPE_DETAIL_USE_CASE,
        UseCaseProxyModule.INVITE_RECIPE_BOOK_USE_CASE,
        UseCaseProxyModule.CREATE_MENU_USE_CASE,
        UseCaseProxyModule.UPDATE_MENU_USE_CASE,
        UseCaseProxyModule.DELETE_MENU_USE_CASE,
        UseCaseProxyModule.VALIDATE_RECIPE_BOOK_JOIN_USE_CASE,
        UseCaseProxyModule.GET_RECIPE_LIST_USE_CASE,
      ],
    };
  }
}
