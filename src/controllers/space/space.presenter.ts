import { ApiProperty } from '@nestjs/swagger';
import { Space, User } from 'src/domain';

export class SpacePresenter {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly users: User[];

  constructor(space: Space) {
    this.id = space.getId;
    this.name = space.getName;
    this.users = space.getUsers;
  }
}

export class SpaceInvitationPresenter {
  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly expiredAt: string;

  constructor({ token, expiredAt }: { token: string; expiredAt: string }) {
    this.token = token;
    this.expiredAt = expiredAt;
  }
}
