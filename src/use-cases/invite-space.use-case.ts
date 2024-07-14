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

  async execute(spaceId: number, userId: number): Promise<SpaceInvitation> {
    const user = await this.userRepository.findUser({ userId });
    user.canInviteSpace();
    // スペースの有効な招待を取得
    const invitations =
      await this.spaceInvitationRepository.findSpaceInvitationsBySpaceId(
        user.getSpaceId,
      );
    // 有効な招待が存在する場合はその招待を返す
    const invitation = invitations.find(
      (invitation) => invitation.getExpiredAt > new Date(),
    );
    if (invitation) {
      return invitation;
    }
    // 有効な招待が存在しない場合は新規作成
    const spaceInvitationBeforePersist = new SpaceInvitationBeforePersist({
      spaceId,
    });
    spaceInvitationBeforePersist.generateAndSetToken();
    return await this.spaceInvitationRepository.save(
      spaceInvitationBeforePersist,
    );
  }
}
