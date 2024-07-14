import { Injectable } from '@nestjs/common';
import { IRecipeRepository } from 'src/domain';
@Injectable()
export class GetRecipeDetailUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(id: number) {
    return await this.recipeRepository.findRecipe(id);
  }
}
