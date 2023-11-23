import { ApiProperty } from '@nestjs/swagger';
import { Menu, Recipe, MenuStatus } from 'src/domain';

export class MenuPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: MenuStatus;

  @ApiProperty()
  scheduledAt?: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  recipeId: string;

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
