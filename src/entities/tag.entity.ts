import { Tag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TagEntity implements Tag {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(partial: Partial<TagEntity>) {
    Object.assign(this, partial);
  }
}
