import { ApiProperty } from '@nestjs/swagger';

export class RecipeBookPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  spaceId: string;
}
