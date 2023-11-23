import { Injectable } from '@nestjs/common';
import {
  IRecipeBookRepository,
  IUserRepository,
  UpdateRecipeBookDto,
} from 'src/domain';

@Injectable()
export class UpdateRecipeBookUseCase {
  constructor(
    private readonly recipeBookRepository: IRecipeBookRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(
    id: string,
    updateRecipeBookDto: UpdateRecipeBookDto,
    userId: string,
  ) {
    const user = await this.userRepository.findUser({ id: userId });
    user.canUpdateRecipeBook();
    const recipeBook = await this.recipeBookRepository.findRecipeBook(id);
    recipeBook.update(updateRecipeBookDto);
    return await this.recipeBookRepository.updateRecipeBook(recipeBook);
  }
}
