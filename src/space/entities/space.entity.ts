import { ApiProperty } from '@nestjs/swagger';

export class Space {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
