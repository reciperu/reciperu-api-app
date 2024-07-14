import { ApiProperty } from '@nestjs/swagger';
import { Menu, Recipe, MenuStatus } from 'src/domain';

export class MenuPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: MenuStatus;

  @ApiProperty()
  scheduledAt?: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  recipeId: number;

  @ApiProperty()
  recipe: Recipe;

  constructor(menu: Menu) {
    this.id = menu.getId;
    this.status = menu.getStatus;
    this.scheduledAt = menu.getScheduledAt;
    this.userId = menu.getUserId;
    this.recipeId = menu.getRecipeId;
    this.recipe = menu.getRecipe;
  }
}

export class PaginatedMenuPresenter {
  @ApiProperty({ type: [MenuPresenter] })
  menus: MenuPresenter[];

  @ApiProperty()
  nextCursor?: number;

  constructor(menus: MenuPresenter[]) {
    this.menus = menus;
    if (this.menus.length === 0) {
      this.nextCursor = undefined;
      return;
    }
    this.nextCursor = this.menus[this.menus.length - 1].id;
  }
}
