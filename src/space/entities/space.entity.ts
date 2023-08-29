import { ApiProperty } from '@nestjs/swagger';
import { Space } from '@prisma/client';

export class SpaceEntity implements Space {
  constructor(partial: Partial<SpaceEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
