import { ApiProperty } from '@nestjs/swagger';
import { RecipeBook, User } from 'src/domain';

export class RecipeBookPresenter {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly users: User[];

  constructor(recipeBook: RecipeBook) {
    this.id = recipeBook.getId;
    this.name = recipeBook.getName;
    this.users = recipeBook.getUsers;
  }
}

export class RecipeBookInvitationPresenter {
  @ApiProperty()
  readonly token: string;

  constructor({ token }: { token: string }) {
    this.token = token;
  }
}

export class RecipeBookJoinPresenter {
  @ApiProperty()
  success: boolean;
}
