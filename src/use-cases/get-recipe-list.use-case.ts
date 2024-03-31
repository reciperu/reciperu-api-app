import { Injectable } from '@nestjs/common';
import { FilterRecipeOptions, IRecipeRepository } from 'src/domain';

@Injectable()
export class GetRecipeListUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}
  async execute(
    spaceId: string,
    cursor: string | undefined,
    filterOptions?: FilterRecipeOptions,
  ) {
    return await this.recipeRepository.findRecipes(
      spaceId,
      cursor,
      filterOptions,
    );
  }
}
