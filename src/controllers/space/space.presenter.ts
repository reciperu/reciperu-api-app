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

  constructor({ token }: { token: string }) {
    this.token = token;
  }
}

export class SpaceJoinPresenter {
  @ApiProperty()
  success: boolean;
}
