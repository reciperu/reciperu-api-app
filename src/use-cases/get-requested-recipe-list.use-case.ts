import { Injectable } from '@nestjs/common';
import { IRecipeRepository, Recipe } from 'src/domain';

@Injectable()
export class GetRequestedRecipeListUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  private groupRecipesByUser(recipes: Recipe[]) {
    const userRecipeMap: Record<string, Recipe[]> = {};

    recipes.forEach((recipe) => {
      recipe.getRequesters.forEach((requester) => {
        if (!userRecipeMap[requester.getUserId]) {
          userRecipeMap[requester.getUserId] = [];
        }
        // ユーザーごとにレシピ情報を追加
        userRecipeMap[requester.getUserId].push(recipe);
      });
    });

    return userRecipeMap;
  }
  async execute(spaceId: string) {
    const recipes = await this.recipeRepository.findRequestedRecipes(spaceId);
    return this.groupRecipesByUser(recipes);
  }
}
