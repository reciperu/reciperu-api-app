import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IRecipeRepository, RecipeBeforePersist, Recipe } from 'src/domain';
import { Recipe as PrismaRecipe } from '@prisma/client';

@Injectable()
export class PrismaRecipeRepository implements IRecipeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async bulkInsert(recipes: RecipeBeforePersist[]): Promise<Recipe[]> {
    const prismaRecipes = await this.prismaService.$transaction(
      recipes.map((recipe) =>
        this.prismaService.recipe.create({
          data: {
            title: recipe.getTitle,
            recipeBookId: recipe.getRecipeBookId,
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
      where: { id: 'id' in recipe ? recipe.getId : '' },
      update: {
        title: recipe.getTitle,
        recipeBookId: recipe.getRecipeBookId,
        userId: recipe.getUserId,
        thumbnailUrl: recipe.getThumbnailUrl,
        imageUrls: recipe.getImageUrls ? recipe.getImageUrls.join(',') : null,
        memo: recipe.getMemo,
        recipeUrl: recipe.getRecipeUrl,
        isFavorite: 'id' in recipe ? recipe.getIsFavorite : false,
        faviconUrl: recipe.getFaviconUrl,
        appName: recipe.getAppName,
      },
      create: {
        title: recipe.getTitle,
        recipeBookId: recipe.getRecipeBookId,
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

  toRecipe(recipe: PrismaRecipe) {
    console.log(recipe, 'recipe');

    return new Recipe({
      id: recipe.id,
      title: recipe.title,
      recipeBookId: recipe.recipeBookId,
      userId: recipe.userId,
      thumbnailUrl: recipe.thumbnailUrl,
      isFavorite: recipe.isFavorite,
      imageUrls: recipe.imageUrls ? recipe.imageUrls.split(',') : null,
      memo: recipe.memo,
      recipeUrl: recipe.recipeUrl,
      faviconUrl: recipe.faviconUrl,
      appName: recipe.appName,
      createdAt: recipe.createdAt,
    });
  }
}
