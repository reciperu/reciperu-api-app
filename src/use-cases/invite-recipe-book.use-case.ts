import { Injectable } from '@nestjs/common';
import {
  IRecipeBookInvitationRepository,
  RecipeBookInvitationBeforePersist,
  IUserRepository,
} from 'src/domain';
@Injectable()
export class InviteRecipeBookUseCase {
  constructor(
    private readonly recipeBookInvitationRepository: IRecipeBookInvitationRepository,
    private readonly userRepository: IUserRepository,
  ) {
    this.recipeBookInvitationRepository = recipeBookInvitationRepository;
  }

  async execute(
    recipeBookId: string,
    useId: string,
  ): Promise<{ token: string }> {
    const user = await this.userRepository.findUser({ id: useId });
    user.canInviteRecipeBook();
    return await this.recipeBookInvitationRepository.create(
      new RecipeBookInvitationBeforePersist(recipeBookId),
    );
  }
}
