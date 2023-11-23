import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from 'src/controllers/recipe';
import { IRecipeRepository, RecipeBeforePersist } from 'src/domain';
@Injectable()
export class CreateRecipesUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(
    createRecipesDto: CreateRecipeDto[],
    userId: string,
    recipeBookId: string,
  ) {
    const recipesBeforePersist = createRecipesDto.map(
      (x) =>
        new RecipeBeforePersist({
          title: x.title,
          recipeBookId: recipeBookId,
          userId: userId,
          thumbnailUrl: x.thumbnailUrl,
          imageUrls: x.imageUrls,
          memo: x.memo,
          recipeUrl: x.recipeUrl,
          faviconUrl: x.faviconUrl,
          appName: x.appName,
        }),
    );
    return await this.recipeRepository.bulkInsert(recipesBeforePersist);
  }
}
