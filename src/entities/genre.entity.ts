import { Genre } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GenreEntity implements Genre {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(partial: Partial<GenreEntity>) {
    Object.assign(this, partial);
  }
}
