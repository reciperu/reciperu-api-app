import { ApiProperty } from '@nestjs/swagger';
import { User, ActiveStatus, SpaceRole } from 'src/domain';

export class UserPresenter {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty({ enum: ActiveStatus })
  readonly activeStatus: ActiveStatus;

  @ApiProperty()
  readonly spaceId: number;

  @ApiProperty({ enum: SpaceRole })
  readonly spaceRole: SpaceRole;

  constructor(user: User) {
    this.id = user.getId;
    this.name = user.getName;
    this.imageUrl = user.getImageUrl;
    this.activeStatus = user.getActiveStatus;
    this.spaceRole = user.getSpaceRole;
    this.spaceId = user.getSpaceId;
  }
}

export class UserTokenPresenter {
  @ApiProperty()
  readonly deviceId: string;

  @ApiProperty()
  readonly token: string;

  constructor({ deviceId, token }: { deviceId: string; token: string }) {
    this.deviceId = deviceId;
    this.token = token;
  }
}
