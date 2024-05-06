import { Module, DynamicModule } from '@nestjs/common';
import {
  LoginUseCase,
  UpdateUserUseCase,
  CreateRecipesUseCase,
  GetSpaceUseCase,
  CreateRecipeUseCase,
  GetRecipeDetailUseCase,
  UpdateSpaceUseCase,
  UpdateRecipeUseCase,
  InviteSpaceUseCase,
  CreateMenuUseCase,
  UpdateMenuUseCase,
  DeleteMenuUseCase,
  ValidateSpaceJoinUseCase,
  GetRecipeListUseCase,
  GetMenuListUseCase,
  SendContactToSlackUseCase,
  GetRecipeMetaDateUseCase,
  CreateRequestedRecipeUseCase,
  DeleteRequestedRecipeUseCase,
} from './';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { FirebaseModule } from 'src/infrastructure/firebase/firebase.module';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import {
  PrismaUserRepository,
  PrismaRecipeRepository,
  PrismaSpaceInvitationRepository,
  PrismaMenuRepository,
  PrismaSpaceRepository,
  PrismaRequestedRecipeRepository,
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
  static readonly GET_SPACE_USE_CASE = 'GET_SPACE_USE_CASE';
  static readonly UPDATE_SPACE_USE_CASE = 'UPDATE_SPACE_USE_CASE';
  static readonly CREATE_RECIPE_USE_CASE = 'CREATE_RECIPE_USE_CASE';
  static readonly UPDATE_RECIPE_USE_CASE = 'UPDATE_RECIPE_USE_CASE';
  static readonly GET_RECIPE_DETAIL_USE_CASE = 'GET_RECIPE_DETAIL_USE_CASE';
  static readonly INVITE_SPACE_USE_CASE = 'INVITE_SPACE_USE_CASE';
  static readonly CREATE_MENU_USE_CASE = 'CREATE_MENU_USE_CASE';
  static readonly UPDATE_MENU_USE_CASE = 'UPDATE_MENU_USE_CASE';
  static readonly DELETE_MENU_USE_CASE = 'DELETE_MENU_USE_CASE';
  static readonly VALIDATE_SPACE_JOIN_USE_CASE = 'VALIDATE_SPACE_JOIN_USE_CASE';
  static readonly GET_RECIPE_LIST_USE_CASE = 'GET_RECIPE_LIST_USE_CASE';
  static readonly GET_MENU_LIST_USE_CASE = 'GET_MENU_LIST_USE_CASE';
  static readonly SEND_CONTACT_TO_SLACK_USE_CASE =
    'SEND_CONTACT_TO_SLACK_USE_CASE';
  static readonly GET_RECIPE_META_DATE_USE_CASE =
    'GET_RECIPE_META_DATE_USE_CASE';
  static readonly CREATE_REQUESTED_RECIPE_USE_CASE =
    'CREATE_REQUESTED_RECIPE_USE_CASE';
  static readonly DELETE_REQUESTED_RECIPE_USE_CASE =
    'DELETE_REQUESTED_RECIPE_USE_CASE';
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
          inject: [PrismaSpaceRepository],
          provide: UseCaseProxyModule.GET_SPACE_USE_CASE,
          useFactory: (spaceRepository: PrismaSpaceRepository) => {
            return new UseCaseProxy(new GetSpaceUseCase(spaceRepository));
          },
        },
        {
          inject: [PrismaSpaceRepository, PrismaUserRepository],
          provide: UseCaseProxyModule.UPDATE_SPACE_USE_CASE,
          useFactory: (
            spaceRepository: PrismaSpaceRepository,
            userRepository: PrismaUserRepository,
          ) => {
            return new UseCaseProxy(
              new UpdateSpaceUseCase(spaceRepository, userRepository),
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
          inject: [PrismaSpaceInvitationRepository, PrismaUserRepository],
          provide: UseCaseProxyModule.INVITE_SPACE_USE_CASE,
          useFactory: (
            spaceInvitationRepository: PrismaSpaceInvitationRepository,
            userRepository: PrismaUserRepository,
          ) =>
            new UseCaseProxy(
              new InviteSpaceUseCase(spaceInvitationRepository, userRepository),
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
          inject: [PrismaSpaceInvitationRepository, PrismaUserRepository],
          provide: UseCaseProxyModule.VALIDATE_SPACE_JOIN_USE_CASE,
          useFactory: (
            spaceInvitationRepository: PrismaSpaceInvitationRepository,
            userRepository: PrismaUserRepository,
            spaceRepository: PrismaSpaceRepository,
          ) =>
            new UseCaseProxy(
              new ValidateSpaceJoinUseCase(
                spaceInvitationRepository,
                userRepository,
                spaceRepository,
              ),
            ),
        },
        {
          inject: [PrismaRecipeRepository],
          provide: UseCaseProxyModule.GET_RECIPE_LIST_USE_CASE,
          useFactory: (recipeRepository: PrismaRecipeRepository) =>
            new UseCaseProxy(new GetRecipeListUseCase(recipeRepository)),
        },
        {
          inject: [PrismaMenuRepository],
          provide: UseCaseProxyModule.GET_MENU_LIST_USE_CASE,
          useFactory: (menuRepository: PrismaMenuRepository) =>
            new UseCaseProxy(new GetMenuListUseCase(menuRepository)),
        },
        {
          inject: [],
          provide: UseCaseProxyModule.SEND_CONTACT_TO_SLACK_USE_CASE,
          useFactory: () => new UseCaseProxy(new SendContactToSlackUseCase()),
        },
        {
          inject: [PrismaRecipeRepository],
          provide: UseCaseProxyModule.GET_RECIPE_META_DATE_USE_CASE,
          useFactory: () => new UseCaseProxy(new GetRecipeMetaDateUseCase()),
        },
        {
          inject: [PrismaRequestedRecipeRepository],
          provide: UseCaseProxyModule.CREATE_REQUESTED_RECIPE_USE_CASE,
          useFactory: (
            prismaRequestedRecipeRepository: PrismaRequestedRecipeRepository,
          ) =>
            new UseCaseProxy(
              new CreateRequestedRecipeUseCase(prismaRequestedRecipeRepository),
            ),
        },
        {
          inject: [PrismaRequestedRecipeRepository],
          provide: UseCaseProxyModule.DELETE_REQUESTED_RECIPE_USE_CASE,
          useFactory: (
            prismaRequestedRecipeRepository: PrismaRequestedRecipeRepository,
          ) =>
            new UseCaseProxy(
              new DeleteRequestedRecipeUseCase(prismaRequestedRecipeRepository),
            ),
        },
      ],
      exports: [
        UseCaseProxyModule.LOGIN_USE_CASE,
        UseCaseProxyModule.UPDATE_USER_USE_CASE,
        UseCaseProxyModule.CREATE_RECIPES_USE_CASE,
        UseCaseProxyModule.GET_SPACE_USE_CASE,
        UseCaseProxyModule.UPDATE_SPACE_USE_CASE,
        UseCaseProxyModule.CREATE_RECIPE_USE_CASE,
        UseCaseProxyModule.UPDATE_RECIPE_USE_CASE,
        UseCaseProxyModule.GET_RECIPE_DETAIL_USE_CASE,
        UseCaseProxyModule.INVITE_SPACE_USE_CASE,
        UseCaseProxyModule.CREATE_MENU_USE_CASE,
        UseCaseProxyModule.UPDATE_MENU_USE_CASE,
        UseCaseProxyModule.DELETE_MENU_USE_CASE,
        UseCaseProxyModule.VALIDATE_SPACE_JOIN_USE_CASE,
        UseCaseProxyModule.GET_RECIPE_LIST_USE_CASE,
        UseCaseProxyModule.GET_MENU_LIST_USE_CASE,
        UseCaseProxyModule.SEND_CONTACT_TO_SLACK_USE_CASE,
        UseCaseProxyModule.GET_RECIPE_META_DATE_USE_CASE,
        UseCaseProxyModule.CREATE_REQUESTED_RECIPE_USE_CASE,
        UseCaseProxyModule.DELETE_REQUESTED_RECIPE_USE_CASE,
      ],
    };
  }
}
