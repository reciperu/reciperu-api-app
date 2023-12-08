import { BadRequestException } from 'src/infrastructure/exceptions';
import { RecipeBookInvitation } from './recipe-book';
export enum RecipeBookRole {
  OWNER = 'OWNER',
  PARTICIPANT = 'PARTICIPANT',
}

export enum ActiveStatus {
  ONBOARDING = 'ONBOARDING',
  JOINED_RECIPE_BOOK = 'JOINED_RECIPE_BOOK',
  NOT_JOINED_RECIPE_BOOK = 'NOT_JOINED_RECIPE_BOOK',
}

export class UserBeforePersist {
  private name: string;
  private imageUrl: string;
  private uid: string;
  constructor({
    name,
    imageUrl,
    uid,
  }: {
    name: string;
    imageUrl: string;
    uid: string;
  }) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.uid = uid;
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

  set setName(name: string) {
    this.name = name;
  }
  set setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
}

export class User extends UserBeforePersist {
  private id: string;
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
    super({ name, imageUrl, uid });
    this.id = id;
    this.activeStatus = activeStatus;
    this.recipeBookId = recipeBookId;
    this.recipeBookRole = recipeBookRole;
  }
  get getId(): string {
    return this.id;
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

  joinRecipeBook(recipeBookId: string): void {
    this.recipeBookId = recipeBookId;
    this.recipeBookRole = RecipeBookRole.PARTICIPANT;
  }

  canUpdateRecipeBook(): void {
    if (this.getRecipeBookRole !== RecipeBookRole.OWNER) {
      throw new BadRequestException('USER_NOT_OWNER');
    }
  }

  canInviteRecipeBook(): void {
    if (this.getRecipeBookRole !== RecipeBookRole.OWNER) {
      throw new BadRequestException('USER_NOT_OWNER');
    }
  }
}

export type IUserRepository = {
  create(user: UserBeforePersist): Promise<User>;
  findUser(findOptions: { uid: string } | { id: string }): Promise<User | null>;
  update(user: User): Promise<User>;
  updateWithRecipeBook(
    user: User,
    invitation: RecipeBookInvitation,
  ): Promise<User>;
};

export type UpdateUserDto = {
  name: string;
  imageUrl: string;
  activeStatus: ActiveStatus;
};
