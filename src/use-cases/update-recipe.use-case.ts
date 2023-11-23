import { Injectable } from '@nestjs/common';
import { IRecipeRepository, UpdateRecipeDto } from 'src/domain';
@Injectable()
export class UpdateRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(id: string, updateRecipesDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findRecipe(id);
    recipe.update(updateRecipesDto);
    return await this.recipeRepository.save(recipe);
  }
}
