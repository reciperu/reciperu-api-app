import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IRecipeRepository,
  RecipeBeforePersist,
  Recipe,
  RecipeRequester,
  FindRecipeOptions,
} from 'src/domain';
import { Recipe as PrismaRecipe, PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from './prisma.user.repository';

const prismaRecipeType = async (prisma: PrismaClient, recipeId: string) =>
  await prisma.recipe.findUnique({
    where: { recipeId },
    include: {
      requestedRecipes: true,
      user: true,
    },
  });

type PrismaRecipeType = NonNullable<
  Awaited<ReturnType<typeof prismaRecipeType>>
>;
@Injectable()
export class PrismaRecipeRepository implements IRecipeRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prismaUserRepository: PrismaUserRepository,
  ) {}

  async findRecipe(recipeId: string): Promise<Recipe> {
    const prismaRecipe = await this.prismaService.recipe.findUnique({
      where: { recipeId },
    });
    if (!prismaRecipe) {
      return null;
    }
    return this.toRecipe(prismaRecipe);
  }

  async findRecipes(
    spaceId: string,
    findRecipeOptions?: FindRecipeOptions,
  ): Promise<Recipe[]> {
    const { requestUserId } = findRecipeOptions;
    const prismaRecipes = await this.prismaService.recipe.findMany({
      take: 5,
      ...(findRecipeOptions.cursor && {
        cursor: { recipeId: findRecipeOptions.cursor },
        skip: 1,
      }),
      where: {
        spaceId,
        title: { contains: findRecipeOptions.title },
        ...(requestUserId && {
          requestedRecipes: {
            some: {
              userId: requestUserId,
            },
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        requestedRecipes: true,
        user: true,
      },
    });
    return prismaRecipes.map((prismaRecipe) => this.toRecipe(prismaRecipe));
  }

  async bulkInsert(recipes: RecipeBeforePersist[]): Promise<Recipe[]> {
    const prismaRecipes = await this.prismaService.$transaction(
      recipes.map((recipe) =>
        this.prismaService.recipe.create({
          data: {
            title: recipe.getTitle,
            spaceId: recipe.getSpaceId,
            userId: recipe.getUserId,
            thumbnailUrl: recipe.getThumbnailUrl,
            imageUrls: recipe.getImageUrls.join(','),
            memo: recipe.getMemo,
            recipeUrl: recipe.getRecipeUrl,
            faviconUrl: recipe.getFaviconUrl,
            appName: recipe.getAppName,
          },
        }),
      ),
    );
    return prismaRecipes.map((prismaRecipe) => this.toRecipe(prismaRecipe));
  }

  async save(recipe: Recipe | RecipeBeforePersist) {
    const prismaRecipe = await this.prismaService.recipe.upsert({
      where: { recipeId: 'id' in recipe ? recipe.getId : '' },
      update: {
        title: recipe.getTitle,
        spaceId: recipe.getSpaceId,
        userId: recipe.getUserId,
        thumbnailUrl: recipe.getThumbnailUrl,
        imageUrls: recipe.getImageUrls ? recipe.getImageUrls.join(',') : null,
        memo: recipe.getMemo,
        recipeUrl: recipe.getRecipeUrl,
        faviconUrl: recipe.getFaviconUrl,
        appName: recipe.getAppName,
      },
      create: {
        title: recipe.getTitle,
        spaceId: recipe.getSpaceId,
        userId: recipe.getUserId,
        thumbnailUrl: recipe.getThumbnailUrl,
        imageUrls: recipe.getImageUrls ? recipe.getImageUrls.join(',') : null,
        memo: recipe.getMemo,
        recipeUrl: recipe.getRecipeUrl,
        faviconUrl: recipe.getFaviconUrl,
        appName: recipe.getAppName,
      },
    });
    return this.toRecipe(prismaRecipe);
  }

  toRecipe(recipe: PrismaRecipe | PrismaRecipeType): Recipe {
    return 'requestedRecipes' in recipe && 'user' in recipe
      ? new Recipe({
          id: recipe.recipeId,
          title: recipe.title,
          spaceId: recipe.spaceId,
          userId: recipe.userId,
          thumbnailUrl: recipe.thumbnailUrl,
          imageUrls: recipe.imageUrls ? recipe.imageUrls.split(',') : null,
          memo: recipe.memo,
          recipeUrl: recipe.recipeUrl,
          faviconUrl: recipe.faviconUrl,
          appName: recipe.appName,
          createdAt: recipe.createdAt,
          requesters: recipe.requestedRecipes.map(
            (requestedRecipe) =>
              new RecipeRequester({ userId: requestedRecipe.userId }),
          ),
          user: this.prismaUserRepository.toUser(recipe.user),
        })
      : new Recipe({
          id: recipe.recipeId,
          title: recipe.title,
          spaceId: recipe.spaceId,
          userId: recipe.userId,
          thumbnailUrl: recipe.thumbnailUrl,
          imageUrls: recipe.imageUrls ? recipe.imageUrls.split(',') : null,
          memo: recipe.memo,
          recipeUrl: recipe.recipeUrl,
          faviconUrl: recipe.faviconUrl,
          appName: recipe.appName,
          createdAt: recipe.createdAt,
        });
  }
}
