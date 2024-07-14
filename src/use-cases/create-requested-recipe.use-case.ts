import { Injectable } from '@nestjs/common';
import {
  IRequestedRecipeRepository,
  CreateRequestedRecipeDto,
} from 'src/domain';

@Injectable()
export class CreateRequestedRecipeUseCase {
  constructor(
    private readonly requestedRecipeRepository: IRequestedRecipeRepository,
  ) {}
  async execute(
    createRequestedRecipeDto: CreateRequestedRecipeDto,
    userId: number,
  ) {
    return await this.requestedRecipeRepository.create(
      userId,
      createRequestedRecipeDto.recipeId,
    );
  }
}
