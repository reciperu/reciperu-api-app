import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/models';
export class UserPresenter {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly imageUrl: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.imageUrl = user.imageUrl;
  }
}
