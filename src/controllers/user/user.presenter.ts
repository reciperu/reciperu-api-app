import { ApiProperty } from '@nestjs/swagger';
import { User, ActiveStatus, SpaceRole } from 'src/domain';

export class UserPresenter {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty({ enum: ActiveStatus })
  readonly activeStatus: ActiveStatus;

  @ApiProperty({ required: false })
  readonly spaceOwnerId?: string;

  @ApiProperty({ required: false })
  readonly spaceParticipantId?: string;

  constructor(user: User) {
    this.id = user.getId;
    this.name = user.getName;
    this.imageUrl = user.getImageUrl;
    this.activeStatus = user.getActiveStatus;
    if (user.getSpaceRole === SpaceRole.PARTICIPANT) {
      this.spaceParticipantId = user.getSpaceId;
    }
    if (user.getSpaceRole === SpaceRole.OWNER) {
      this.spaceOwnerId = user.getSpaceId;
    }
  }
}
