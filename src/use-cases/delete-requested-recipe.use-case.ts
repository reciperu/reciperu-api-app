import { Injectable } from '@nestjs/common';
import { IRequestedRecipeRepository } from 'src/domain';

@Injectable()
export class DeleteRequestedRecipeUseCase {
  constructor(
    private readonly requestedRecipeRepository: IRequestedRecipeRepository,
  ) {}
  async execute(recipeId: string, userId: string) {
    return await this.requestedRecipeRepository.delete(userId, recipeId);
  }
}
