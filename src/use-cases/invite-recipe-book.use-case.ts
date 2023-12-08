import { Injectable } from '@nestjs/common';
import {
  IRecipeBookInvitationRepository,
  RecipeBookInvitationBeforePersist,
  RecipeBookInvitation,
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
  ): Promise<RecipeBookInvitation> {
    const user = await this.userRepository.findUser({ id: useId });
    user.canInviteRecipeBook();
    const recipeBookInvitationBeforePersist =
      new RecipeBookInvitationBeforePersist({
        recipeBookId,
      });
    recipeBookInvitationBeforePersist.generateToken();
    return await this.recipeBookInvitationRepository.save(
      recipeBookInvitationBeforePersist,
    );
  }
}
