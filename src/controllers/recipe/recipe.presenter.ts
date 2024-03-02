import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from 'src/domain';

export class RecipePresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  recipeBookId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  isFavorite: boolean;

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

  constructor(recipe: Recipe) {
    this.id = recipe.getId;
    this.title = recipe.getTitle;
    this.recipeBookId = recipe.getSpaceId;
    this.userId = recipe.getUserId;
    this.thumbnailUrl = recipe.getThumbnailUrl;
    this.imageUrls = recipe.getImageUrls;
    this.memo = recipe.getMemo;
    this.recipeUrl = recipe.getRecipeUrl;
    this.appName = recipe.getAppName;
    this.faviconUrl = recipe.getFaviconUrl;
    this.createdAt = recipe.getCreatedAt;
  }
}

export class PaginatedRecipePresenter {
  @ApiProperty({ type: [RecipePresenter] })
  recipes: RecipePresenter[];

  @ApiProperty()
  nextCursor?: string;

  constructor(recipes: RecipePresenter[]) {
    this.recipes = recipes;
    if (this.recipes.length === 0) {
      this.nextCursor = undefined;
      return;
    }
    this.nextCursor = this.recipes[this.recipes.length - 1].id;
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
