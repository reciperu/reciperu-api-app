import { Injectable } from '@nestjs/common';
import { RecipeBook, IRecipeBookRepository } from 'src/domain';

@Injectable()
export class GetRecipeBookUseCase {
  constructor(private readonly recipeBookRepository: IRecipeBookRepository) {}
  async execute(id: string): Promise<RecipeBook> {
    const recipeBook = await this.recipeBookRepository.findRecipeBook(id);
    return recipeBook;
  }
}
