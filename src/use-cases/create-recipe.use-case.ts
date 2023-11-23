import { Injectable } from '@nestjs/common';
import {
  IRecipeRepository,
  RecipeBeforePersist,
  CreateRecipeDto,
} from 'src/domain';
@Injectable()
export class CreateRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(
    createRecipesDto: CreateRecipeDto,
    userId: string,
    recipeBookId: string,
  ) {
    return await this.recipeRepository.save(
      new RecipeBeforePersist({
        title: createRecipesDto.title,
        recipeBookId: recipeBookId,
        userId: userId,
        thumbnailUrl: createRecipesDto.thumbnailUrl,
        imageUrls: createRecipesDto.imageUrls,
        memo: createRecipesDto.memo,
        recipeUrl: createRecipesDto.recipeUrl,
        faviconUrl: createRecipesDto.faviconUrl,
        appName: createRecipesDto.appName,
      }),
    );
  }
}
