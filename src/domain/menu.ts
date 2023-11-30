import { Recipe } from './recipe';

export enum MenuStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
}
export class MenuBeforePersist {
  private recipeId: string;
  private scheduledAt?: Date;
  private userId: string;

  constructor({
    recipeId,
    userId,
    scheduledAt,
  }: {
    recipeId: string;
    userId: string;
    scheduledAt?: Date;
  }) {
    this.recipeId = recipeId;
    this.userId = userId;
    this.scheduledAt = scheduledAt;
  }
  get getRecipeId(): string {
    return this.recipeId;
  }

  get getUserId(): string {
    return this.userId;
  }
  get getScheduledAt(): Date | undefined {
    return this.scheduledAt;
  }

  set setScheduledAt(scheduledAt: Date | undefined) {
    this.scheduledAt = scheduledAt;
  }
}

export class Menu extends MenuBeforePersist {
  private id: string;
  private status: MenuStatus;
  private createdAt: Date;
  private recipe: Recipe;
  constructor({
    id,
    recipeId,
    userId,
    scheduledAt,
    status,
    createdAt,
    recipe,
  }: {
    id: string;
    recipeId: string;
    userId: string;
    scheduledAt?: Date;
    status: MenuStatus;
    createdAt: Date;
    recipe: Recipe;
  }) {
    super({
      recipeId,
      scheduledAt,
      userId,
    });
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.recipe = recipe;
  }
  get getId(): string {
    return this.id;
  }
  get getStatus(): MenuStatus {
    return this.status;
  }
  get getCreatedAt(): Date {
    return this.createdAt;
  }

  get getRecipe(): Recipe {
    return this.recipe;
  }

  set setStatus(status: MenuStatus) {
    this.status = status;
  }

  update(updateMenuDto: UpdateMenuDto) {
    this.setStatus = updateMenuDto.status;
    this.setScheduledAt = updateMenuDto.scheduledAt;
  }
}

export type IMenuRepository = {
  save(menu: MenuBeforePersist | Menu): Promise<Menu>;
  findMenu(id: string): Promise<Menu>;
  delete(id: string): Promise<void>;
};

export type CreateMenuDto = {
  recipeId: string;
  scheduledAt?: Date;
};

export type UpdateMenuDto = {
  status: MenuStatus;
  scheduledAt?: Date;
};
