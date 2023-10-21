import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  recipeId: number;

  @ApiProperty()
  scheduledAt: Date;
}
