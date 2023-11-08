import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from 'src/controllers/recipe';
import { IRecipeRepository, RecipeBeforePersist } from 'src/domain';
@Injectable()
export class CreateRecipesUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(createRecipesDto: CreateRecipeDto[]) {
    // const { createRecipesDto } = arg;
    const recipesBeforePersist = createRecipesDto.map(
      (x) =>
        new RecipeBeforePersist({
          title: x.title,
          recipeBookId: x.recipeBookId,
          userId: x.userId,
          thumbnailUrl: x.thumbnailUrl,
          imageUrls: x.imageUrls,
          memo: x.memo,
        }),
    );
    return await this.recipeRepository.bulkInsert(recipesBeforePersist);
  }
}
