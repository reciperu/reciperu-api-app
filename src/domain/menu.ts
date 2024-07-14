import { Recipe } from './recipe';

export enum MenuStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
}

export type MenuStatusKey = keyof typeof MenuStatus;
export class MenuBeforePersist {
  private recipeId: number;
  private scheduledAt?: Date;
  private userId: number;
  private spaceId: number;

  constructor({
    recipeId,
    scheduledAt,
    userId,
    spaceId,
  }: {
    recipeId: number;
    scheduledAt?: Date;
    userId: number;
    spaceId: number;
  }) {
    this.recipeId = recipeId;
    this.userId = userId;
    this.scheduledAt = scheduledAt;
    this.spaceId = spaceId;
  }
  get getRecipeId(): number {
    return this.recipeId;
  }

  get getUserId(): number {
    return this.userId;
  }
  get getScheduledAt(): Date | undefined {
    return this.scheduledAt;
  }

  get getSpaceId(): number {
    return this.spaceId;
  }

  set setScheduledAt(scheduledAt: Date | undefined) {
    this.scheduledAt = scheduledAt;
  }
}

export class Menu extends MenuBeforePersist {
  private id: number;
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
    spaceId,
  }: {
    id: number;
    recipeId: number;
    scheduledAt?: Date;
    status: MenuStatus;
    createdAt: Date;
    recipe: Recipe;
    userId: number;
    spaceId: number;
  }) {
    super({
      recipeId,
      scheduledAt,
      userId,
      spaceId,
    });
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.recipe = recipe;
  }
  get getId(): number {
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
  findMenus({
    spaceId,
    cursor,
    statuses,
  }: {
    spaceId: number;
    cursor?: number;
    statuses?: MenuStatusKey[];
  }): Promise<Menu[]>;
  findMenu(id: number): Promise<Menu>;
  save(menu: MenuBeforePersist | Menu): Promise<Menu>;
  delete(id: number): Promise<void>;
};

export type CreateMenuDto = {
  recipeId: number;
  scheduledAt?: Date;
};

export type UpdateMenuDto = {
  status: MenuStatus;
  scheduledAt?: Date;
};
