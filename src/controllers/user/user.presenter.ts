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

  @ApiProperty({ required: false })
  readonly recipeBookOwnerId?: string;

  @ApiProperty({ required: false })
  readonly recipeBookParticipantId?: string;

  constructor(user: User) {
    this.id = user.getId;
    this.name = user.getName;
    this.imageUrl = user.getImageUrl;
    this.activeStatus = user.getActiveStatus;
    if (user.getRecipeBookRole === RecipeBookRole.PARTICIPANT) {
      this.recipeBookParticipantId = user.getRecipeBookId;
    }
    if (user.getRecipeBookRole === RecipeBookRole.OWNER) {
      this.recipeBookOwnerId = user.getRecipeBookId;
    }
  }
}
