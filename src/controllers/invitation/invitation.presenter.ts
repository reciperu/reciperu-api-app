import { ApiProperty } from '@nestjs/swagger';

export class InvitationPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  spaceId: string;
}
