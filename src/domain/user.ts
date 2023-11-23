import { BadRequestException } from 'src/infrastructure/exceptions';
export enum RecipeBookRole {
  OWNER = 'OWNER',
  PARTICIPANT = 'PARTICIPANT',
}

export enum ActiveStatus {
  ONBOARDING = 'ONBOARDING',
  JOINED_RECIPE_BOOK = 'JOINED_RECIPE_BOOK',
  NOT_JOINED_RECIPE_BOOK = 'NOT_JOINED_RECIPE_BOOK',
}
export class User {
  private id: string;
  private name: string;
  private imageUrl: string;
  private uid: string;
  private activeStatus: ActiveStatus;
  private recipeBookId: string;
  private recipeBookRole: RecipeBookRole;

  constructor({
    id,
    name,
    imageUrl,
    uid,
    activeStatus,
    recipeBookId,
    recipeBookRole,
  }: {
    id: string;
    name: string;
    imageUrl: string;
    uid: string;
    activeStatus: ActiveStatus;
    recipeBookId: string;
    recipeBookRole: RecipeBookRole;
  }) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.uid = uid;
    this.activeStatus = activeStatus;
    this.recipeBookId = recipeBookId;
    this.recipeBookRole = recipeBookRole;
  }
  get getId(): string {
    return this.id;
  }
  get getName(): string {
    return this.name;
  }
  get getImageUrl(): string {
    return this.imageUrl;
  }
  get getUid(): string {
    return this.uid;
  }
  get getActiveStatus(): ActiveStatus {
    return this.activeStatus;
  }
  get getRecipeBookId(): string {
    return this.recipeBookId;
  }
  get getRecipeBookRole(): RecipeBookRole {
    return this.recipeBookRole;
  }

  set setName(name: string) {
    this.name = name;
  }
  set setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
  set setActiveStatus(activeStatus: ActiveStatus) {
    this.activeStatus = activeStatus;
  }

  update({
    name,
    imageUrl,
    activeStatus,
  }: {
    name: string;
    imageUrl: string;
    activeStatus: ActiveStatus;
  }): void {
    this.setName = name;
    this.setImageUrl = imageUrl;
    this.setActiveStatus = activeStatus;
  }

  canUpdateRecipeBook(): void {
    if (this.getRecipeBookRole !== RecipeBookRole.OWNER) {
      throw new BadRequestException('USER_NOT_OWNER');
    }
  }
}

export class UserBeforePersist {
  constructor(
    readonly name: string,
    readonly imageUrl: string,
    readonly uid: string,
  ) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.uid = uid;
  }
}

export type IUserRepository = {
  create(user: UserBeforePersist): Promise<User>;
  findUser(findOptions: { uid: string } | { id: string }): Promise<User | null>;
  update(user: User): Promise<User>;
};
