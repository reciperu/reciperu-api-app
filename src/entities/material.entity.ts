import { Material } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MaterialEntity implements Material {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(partial: Partial<MaterialEntity>) {
    Object.assign(this, partial);
  }
}
