import { Injectable } from '@nestjs/common';
import {
  ISpaceInvitationRepository,
  IUserRepository,
  ISpaceRepository,
  SpaceInvitation,
} from 'src/domain';
import { BadRequestException } from 'src/infrastructure/exceptions';

@Injectable()
export class ValidateSpaceJoinUseCase {
  constructor(
    private readonly spaceInvitationRepository: ISpaceInvitationRepository,
    private readonly userRepository: IUserRepository,
    private readonly spaceRepository: ISpaceRepository,
  ) {}

  async execute(token: string, userId: string): Promise<void> {
    const invitation =
      await this.spaceInvitationRepository.findSpaceInvitationByToken(token);

    this.validate(invitation);
    invitation.useToken();

    const user = await this.userRepository.findUser({ userId });
    user.joinSpace(invitation.getSpaceId);
    await this.userRepository.updateWithSpace(user, invitation);
  }

  private async validate(invitation: SpaceInvitation) {
    if (!invitation) {
      throw new BadRequestException();
    }

    const space = await this.spaceRepository.findSpace(invitation.getSpaceId);
    if (!space) {
      throw new BadRequestException();
    }

    invitation.validate();
  }
}
