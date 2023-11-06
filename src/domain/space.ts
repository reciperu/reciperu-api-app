import { User } from './';
import { RecipeBook } from './recipe-book';

export class Space {
  private id: string;
  private recipeBook: RecipeBook;
  private users: User[];
  constructor({
    id,
    recipeBook,
    users,
  }: {
    id: string;
    recipeBook: RecipeBook;
    users: User[];
  }) {
    this.id = id;
    this.recipeBook = recipeBook;
    this.users = users;
  }
  get getId(): string {
    return this.id;
  }

  get getRecipeBook(): RecipeBook {
    return this.recipeBook;
  }
  get getUsers(): User[] {
    return this.users;
  }
}

export class SpaceBeforePersist {
  recipeBookName: string;
  userId: string;
  constructor(recipeBookName: string, userId: string) {
    this.recipeBookName = recipeBookName;
    this.userId = userId;
  }
}

export type ISpaceRepository = {
  insert(space: SpaceBeforePersist): Promise<Space>;
};
