import { Injectable } from '@nestjs/common';
import { IRecipeBookInvitationRepository, IUserRepository } from 'src/domain';

@Injectable()
export class ValidateRecipeBookJoinUseCase {
  constructor(
    private readonly recipeBookInvitationRepository: IRecipeBookInvitationRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(token: string, userId: string): Promise<void> {
    const invitation =
      await this.recipeBookInvitationRepository.findRecipeBookInvitation(token);

    invitation.validate();
    invitation.useToken();

    const user = await this.userRepository.findUser({ id: userId });
    user.joinRecipeBook(invitation.getRecipeBookId);
    await this.userRepository.updateWithRecipeBook(user, invitation);
  }
}
