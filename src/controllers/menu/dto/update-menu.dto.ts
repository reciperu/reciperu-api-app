import { ApiProperty } from '@nestjs/swagger';

enum MenuStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
}

export class UpdateMenuDto {
  @ApiProperty()
  status: MenuStatus;
}
