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
            title: recipe.title,
            recipeBookId: recipe.recipeBookId,
            userId: recipe.userId,
            thumbnailUrl: recipe.thumbnailUrl,
            imageUrls: recipe.imageUrls.join(','),
            memo: recipe.memo,
            recipeUrl: recipe.recipeUrl,
            faviconUrl: recipe.faviconUrl,
            appName: recipe.appName,
          },
        }),
      ),
    );
    return prismaRecipes.map((prismaRecipe) => this.toRecipe(prismaRecipe));
  }

  toRecipe(recipe: PrismaRecipe) {
    return new Recipe({
      id: recipe.id,
      title: recipe.title,
      recipeBookId: recipe.recipeBookId,
      userId: recipe.userId,
      thumbnailUrl: recipe.thumbnailUrl,
      isFavorite: recipe.isFavorite,
      imageUrls: recipe.imageUrls.split(','),
      memo: recipe.memo,
      recipeUrl: recipe.recipeUrl,
      faviconUrl: recipe.faviconUrl,
      appName: recipe.appName,
    });
  }
}
