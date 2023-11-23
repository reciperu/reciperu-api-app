import { User } from '.';

export class RecipeBook {
  private id: string;
  private name: string;
  private users: User[];
  constructor({
    id,
    name,
    users,
  }: {
    id: string;
    name: string;
    users: User[];
  }) {
    this.id = id;
    this.name = name;
    this.users = users;
  }

  get getId(): string {
    return this.id;
  }
  get getName(): string {
    return this.name;
  }
  get getUsers(): User[] {
    return this.users;
  }

  set setName(name: string) {
    this.name = name;
  }

  update(updateRecipeBookDto: UpdateRecipeBookDto) {
    this.setName = updateRecipeBookDto.name;
  }
}

export type IRecipeBookRepository = {
  findRecipeBook(id: string): Promise<RecipeBook>;
  updateRecipeBook(recipeBook: RecipeBook): Promise<RecipeBook>;
};

export type CreateRecipeBookDto = {
  name: string;
};

export type UpdateRecipeBookDto = {
  name: string;
};
