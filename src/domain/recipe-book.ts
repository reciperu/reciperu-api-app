import { User } from '.';
import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';
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

export class RecipeBookInvitationBeforePersist {
  private token: string;
  private expiredAt: Date;
  private recipeBookId: string;
  constructor(recipeBookId: string) {
    this.recipeBookId = recipeBookId;
    this.token = randomUUID();
    this.expiredAt = dayjs().add(1, 'day').toDate();
  }
  get getRecipeBookId(): string {
    return this.recipeBookId;
  }

  get getToken(): string {
    return this.token;
  }

  get getExpiredAt(): Date {
    return this.expiredAt;
  }
}

export type IRecipeBookRepository = {
  findRecipeBook(id: string): Promise<RecipeBook>;
  updateRecipeBook(recipeBook: RecipeBook): Promise<RecipeBook>;
};

export type IRecipeBookInvitationRepository = {
  create(
    recipeBookInvitationBeforePersist: RecipeBookInvitationBeforePersist,
  ): Promise<{ token: string }>;
};

export type CreateRecipeBookDto = {
  name: string;
};

export type UpdateRecipeBookDto = {
  name: string;
};
