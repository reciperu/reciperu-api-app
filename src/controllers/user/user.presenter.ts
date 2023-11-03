import { ApiProperty } from '@nestjs/swagger';
import { User, ActiveStatus } from 'src/domain/models';

export class UserPresenter implements Partial<User> {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty({ enum: ActiveStatus })
  readonly activeStatus: ActiveStatus;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.imageUrl = user.imageUrl;
    this.activeStatus = user.activeStatus;
  }
}
