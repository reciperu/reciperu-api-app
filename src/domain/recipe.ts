export class RecipeBeforePersist {
  private title: string;
  private recipeBookId: string;
  private userId: string;
  private thumbnailUrl?: string;
  private imageUrls?: string[];
  private memo?: string;
  private recipeUrl?: string;
  private faviconUrl?: string;
  private appName?: string;

  constructor({
    title,
    recipeBookId,
    userId,
    thumbnailUrl,
    imageUrls,
    memo,
    recipeUrl,
    faviconUrl,
    appName,
  }: {
    title: string;
    recipeBookId: string;
    userId: string;
    thumbnailUrl?: string;
    imageUrls?: string[];
    memo?: string;
    recipeUrl?: string;
    faviconUrl?: string;
    appName?: string;
  }) {
    this.title = title;
    this.recipeBookId = recipeBookId;
    this.userId = userId;
    this.thumbnailUrl = thumbnailUrl;
    this.imageUrls = imageUrls;
    this.memo = memo;
    this.recipeUrl = recipeUrl;
    this.faviconUrl = faviconUrl;
    this.appName = appName;
  }

  get getTitle(): string {
    return this.title;
  }

  get getRecipeBookId(): string {
    return this.recipeBookId;
  }

  get getUserId(): string {
    return this.userId;
  }

  get getThumbnailUrl(): string | undefined {
    return this.thumbnailUrl;
  }

  get getImageUrls(): string[] | undefined {
    return this.imageUrls;
  }

  get getMemo(): string | undefined {
    return this.memo;
  }

  get getRecipeUrl(): string | undefined {
    return this.recipeUrl;
  }

  get getFaviconUrl(): string | undefined {
    return this.faviconUrl;
  }

  get getAppName(): string | undefined {
    return this.appName;
  }

  set setTitle(title: string) {
    this.title = title;
  }
  set setThumbnailUrl(thumbnailUrl: string) {
    this.thumbnailUrl = thumbnailUrl;
  }

  set setImageUrls(imageUrls: string[]) {
    this.imageUrls = imageUrls;
  }

  set setMemo(memo: string) {
    this.memo = memo;
  }

  set setRecipeUrl(recipeUrl: string) {
    this.recipeUrl = recipeUrl;
  }

  set setFaviconUrl(faviconUrl: string) {
    this.faviconUrl = faviconUrl;
  }
  set setAppName(appName: string) {
    this.appName = appName;
  }
}

export class Recipe extends RecipeBeforePersist {
  private id: string;
  private isFavorite: boolean;
  private createdAt: Date;
  constructor({
    id,
    title,
    recipeBookId,
    userId,
    thumbnailUrl,
    imageUrls,
    memo,
    recipeUrl,
    isFavorite,
    faviconUrl,
    appName,
    createdAt,
  }: {
    id: string;
    title: string;
    recipeBookId: string;
    userId: string;
    thumbnailUrl?: string;
    imageUrls?: string[];
    memo?: string;
    recipeUrl?: string;
    isFavorite: boolean;
    faviconUrl?: string;
    appName?: string;
    createdAt: Date;
  }) {
    super({
      title,
      recipeBookId,
      userId,
      thumbnailUrl,
      imageUrls,
      memo,
      recipeUrl,
      faviconUrl,
      appName,
    });
    this.id = id;
    this.isFavorite = isFavorite;
    this.createdAt = createdAt;
  }
  get getId(): string {
    return this.id;
  }
  get getCreatedAt(): Date {
    return this.createdAt;
  }
  get getIsFavorite(): boolean {
    return this.isFavorite;
  }

  set setIsFavorite(isFavorite: boolean) {
    this.isFavorite = isFavorite;
  }

  update(updateRecipeDto: UpdateRecipeDto) {
    const {
      title,
      thumbnailUrl,
      imageUrls,
      memo,
      recipeUrl,
      faviconUrl,
      appName,
      isFavorite,
    } = updateRecipeDto;
    this.setTitle = title;
    this.setThumbnailUrl = thumbnailUrl;
    this.setImageUrls = imageUrls;
    this.setMemo = memo;
    this.setRecipeUrl = recipeUrl;
    this.setFaviconUrl = faviconUrl;
    this.setAppName = appName;
    this.setIsFavorite = isFavorite;
  }
}

export type IRecipeRepository = {
  findRecipe(id: string): Promise<Recipe>;
  bulkInsert(recipes: RecipeBeforePersist[]): Promise<Recipe[]>;
  save(recipe: Recipe | RecipeBeforePersist): Promise<Recipe>;
  findRecipes(
    recipeBookId: string,
    cursor?: string,
    findOptions?: FindRecipeOptions,
  ): Promise<Recipe[]>;
};

export type UpdateRecipeDto = {
  title: string;
  isFavorite: boolean;
  thumbnailUrl?: string;
  imageUrls?: string[];
  memo?: string;
  recipeUrl?: string;
  faviconUrl?: string;
  appName?: string;
};

export type CreateRecipeDto = {
  title: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  memo?: string;
  recipeUrl?: string;
  faviconUrl?: string;
  appName?: string;
};

export type FindRecipeOptions = {
  favorite?: boolean;
};
