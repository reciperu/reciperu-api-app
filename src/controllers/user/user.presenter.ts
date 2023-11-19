import { ApiProperty } from '@nestjs/swagger';
import { User, ActiveStatus, RecipeBookRole } from 'src/domain';

export class UserPresenter {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty({ enum: ActiveStatus })
  readonly activeStatus: ActiveStatus;

  @ApiProperty()
  readonly recipeBookId: string;

  @ApiProperty({ enum: RecipeBookRole })
  readonly recipeBookRole: RecipeBookRole;

  constructor(user: User) {
    this.id = user.getId;
    this.name = user.getName;
    this.imageUrl = user.getImageUrl;
    this.activeStatus = user.getActiveStatus;
    this.recipeBookId = user.getRecipeBookId;
    this.recipeBookRole = user.getRecipeBookRole;
  }
}
