import { Injectable } from '@nestjs/common';
import { FindRecipeOptions, IRecipeRepository } from 'src/domain';

@Injectable()
export class GetRecipeListUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(spaceId: string, findOptions?: FindRecipeOptions) {
    return await this.recipeRepository.findRecipes(spaceId, findOptions);
  }
}
