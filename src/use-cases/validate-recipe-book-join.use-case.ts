import { Injectable } from '@nestjs/common';
import { ISpaceInvitationRepository, IUserRepository } from 'src/domain';

@Injectable()
export class ValidateSpaceJoinUseCase {
  constructor(
    private readonly spaceInvitationRepository: ISpaceInvitationRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(token: string, userId: string): Promise<void> {
    const invitation = await this.spaceInvitationRepository.findSpaceInvitation(
      token,
    );

    invitation.validate();
    invitation.useToken();

    const user = await this.userRepository.findUser({ userId });
    user.joinSpace(invitation.getSpaceId);
    await this.userRepository.updateWithSpace(user, invitation);
  }
}
