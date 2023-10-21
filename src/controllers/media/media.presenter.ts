import { ApiProperty } from '@nestjs/swagger';

export class MediaPresenter {
  @ApiProperty()
  url: string[];
}
