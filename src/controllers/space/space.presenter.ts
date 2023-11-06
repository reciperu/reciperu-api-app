import { ApiProperty } from '@nestjs/swagger';
import { Space, RecipeBook, User } from 'src/domain';

export class SpacePresenter {
  @ApiProperty()
  private readonly id: string;

  @ApiProperty()
  private readonly recipeBook: RecipeBook;

  @ApiProperty()
  private readonly users: User[];

  constructor(space: Space) {
    this.id = space.getId;
    this.recipeBook = space.getRecipeBook;
    this.users = space.getUsers;
  }
}
