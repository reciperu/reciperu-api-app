import { ApiProperty } from '@nestjs/swagger';
import { RecipeBookPresenter } from '../recipe-book/recipe-book.presenter';

enum RecipeBookRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export class UserPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  recipeBookRole: RecipeBookRole;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  recipeBook: RecipeBookPresenter;
}
