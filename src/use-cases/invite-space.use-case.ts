import { Injectable } from '@nestjs/common';
import {
  SpaceInvitationBeforePersist,
  SpaceInvitation,
  ISpaceInvitationRepository,
  IUserRepository,
} from 'src/domain';
@Injectable()
export class InviteSpaceUseCase {
  constructor(
    private readonly spaceInvitationRepository: ISpaceInvitationRepository,
    private readonly userRepository: IUserRepository,
  ) {
    this.spaceInvitationRepository = spaceInvitationRepository;
  }

  async execute(spaceId: string, userId: string): Promise<SpaceInvitation> {
    const user = await this.userRepository.findUser({ userId });
    user.canInviteSpace();
    const spaceInvitationBeforePersist = new SpaceInvitationBeforePersist({
      spaceId,
    });
    spaceInvitationBeforePersist.generateToken();
    return await this.spaceInvitationRepository.save(
      spaceInvitationBeforePersist,
    );
  }
}
