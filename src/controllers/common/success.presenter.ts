import { ApiProperty } from '@nestjs/swagger';

export class SuccessPresenter {
  @ApiProperty({
    default: true,
  })
  success: boolean;
  constructor() {
    this.success = true;
  }
}
