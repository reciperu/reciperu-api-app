import { Injectable } from '@nestjs/common';
import {
  IRecipeBookInvitationRepository,
  RecipeBookInvitationBeforePersist,
} from 'src/domain';
import * as dayjs from 'dayjs';
@Injectable()
export class InvitationRecipeBookUseCase {
  constructor(
    private readonly recipeBookInvitationRepository: IRecipeBookInvitationRepository,
  ) {
    this.recipeBookInvitationRepository = recipeBookInvitationRepository;
  }

  async execute(recipeBookId: string): Promise<{ token: string }> {
    console.log(dayjs().add(1, 'day').toDate());
    console.log(recipeBookId, 'recipeBookId');

    return await this.recipeBookInvitationRepository.create(
      new RecipeBookInvitationBeforePersist(recipeBookId),
    );
  }
}
