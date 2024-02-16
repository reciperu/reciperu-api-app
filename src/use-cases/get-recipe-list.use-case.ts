import { Injectable } from '@nestjs/common';
import { IRecipeRepository } from 'src/domain';

@Injectable()
export class GetRecipeListUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(recipeBookId: string, cursor: string | undefined) {
    return await this.recipeRepository.findRecipes(recipeBookId, cursor);
  }
}
