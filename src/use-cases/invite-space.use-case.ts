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
    // 招待可能なユーザーのみ招待可能
    const invitation =
      await this.spaceInvitationRepository.findValidSpaceInvitation(
        user.getSpaceId,
      );
    // 有効な招待が存在する場合はその招待を返す
    if (invitation) {
      return invitation;
    }
    // 有効な招待が存在しない場合は新規作成
    const spaceInvitationBeforePersist = new SpaceInvitationBeforePersist({
      spaceId,
    });
    await spaceInvitationBeforePersist.generateToken();
    return await this.spaceInvitationRepository.save(
      spaceInvitationBeforePersist,
    );
  }
}
