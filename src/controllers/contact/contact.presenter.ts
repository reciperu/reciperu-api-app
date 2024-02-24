import { ApiProperty } from '@nestjs/swagger';

export class ContactPresenter {
  @ApiProperty()
  readonly success: boolean;

  constructor() {
    this.success = true;
  }
}
