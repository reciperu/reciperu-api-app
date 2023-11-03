import { ApiProperty } from '@nestjs/swagger';

export class SpacePresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  recipeBookName: string;

  @ApiProperty()
  recipeBookId: string;
}
