import { ApiProperty } from '@nestjs/swagger';
import { Recipe, RecipeRequester } from 'src/domain';
import { UserPresenter } from '../user';

export class RecipePresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  spaceId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  thumbnailUrl?: string;

  @ApiProperty()
  imageUrls?: string[];

  @ApiProperty()
  memo?: string;

  @ApiProperty()
  recipeUrl?: string;

  @ApiProperty()
  appName?: string;

  @ApiProperty()
  faviconUrl?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  requesters?: string[];

  @ApiProperty()
  user?: UserPresenter;

  constructor(recipe: Recipe) {
    this.id = recipe.getId;
    this.title = recipe.getTitle;
    this.spaceId = recipe.getSpaceId;
    this.userId = recipe.getUserId;
    this.thumbnailUrl = recipe.getThumbnailUrl;
    this.imageUrls = recipe.getImageUrls;
    this.memo = recipe.getMemo;
    this.recipeUrl = recipe.getRecipeUrl;
    this.appName = recipe.getAppName;
    this.faviconUrl = recipe.getFaviconUrl;
    this.createdAt = recipe.getCreatedAt;
    this.requesters = recipe.getRequesters.map(
      (requester) => requester.getUserId,
    );
    this.user = recipe.getUser ? new UserPresenter(recipe.getUser) : undefined;
  }
}

export class PaginatedRecipePresenter {
  @ApiProperty({ type: [RecipePresenter] })
  recipes: RecipePresenter[];

  @ApiProperty()
  nextCursor?: string;

  constructor(recipes: RecipePresenter[]) {
    this.recipes = recipes;
    this.nextCursor = this.recipes.at(-1)?.id;
  }
}

export class RecipeMetaDataPresenter {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  thumbnailUrl?: string;

  @ApiProperty()
  appName?: string;

  @ApiProperty()
  faviconUrl?: string;

  constructor({
    title,
    thumbnailUrl,
    appName,
    faviconUrl,
  }: {
    title: string;
    thumbnailUrl: string;
    appName: string;
    faviconUrl: string;
  }) {
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.appName = appName;
    this.faviconUrl = faviconUrl;
  }
}

export class CreateRequestedRecipePresenter {
  @ApiProperty({
    default: true,
  })
  success: boolean;
}

export class DeleteRequestedRecipePresenter {
  @ApiProperty({
    default: true,
  })
  success: boolean;
}
