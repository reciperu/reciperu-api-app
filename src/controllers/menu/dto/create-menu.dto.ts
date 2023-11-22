import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  recipeId: string;

  @ApiProperty()
  scheduledAt: Date;
}
