export class Recipe {
  private id: string;
  private title: string;
  private recipeBookId: string;
  private userId: string;
  private thumbnailUrl?: string;
  private imageUrls?: string[];
  private memo?: string;
  private recipeUrl?: string;
  private isFavorite: boolean;
  private faviconUrl?: string;
  private appName?: string;

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
  }) {
    this.id = id;
    this.title = title;
    this.recipeBookId = recipeBookId;
    this.userId = userId;
    this.thumbnailUrl = thumbnailUrl;
    this.imageUrls = imageUrls;
    this.memo = memo;
    this.recipeUrl = recipeUrl;
    this.isFavorite = isFavorite;
    this.faviconUrl = faviconUrl;
    this.appName = appName;
  }

  get getId(): string {
    return this.id;
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

  get getIsFavorite(): boolean {
    return this.isFavorite;
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
  set setIsFavorite(isFavorite: boolean) {
    this.isFavorite = isFavorite;
  }

  set setFaviconUrl(faviconUrl: string) {
    this.faviconUrl = faviconUrl;
  }
  set setAppName(appName: string) {
    this.appName = appName;
  }
}

export class RecipeBeforePersist {
  readonly title: string;
  readonly recipeBookId: string;
  readonly userId: string;
  readonly thumbnailUrl?: string;
  readonly imageUrls?: string[];
  readonly memo?: string;
  readonly recipeUrl?: string;
  readonly faviconUrl?: string;
  readonly appName?: string;
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
    this.thumbnailUrl = thumbnailUrl;
    this.userId = userId;
    this.imageUrls = imageUrls;
    this.memo = memo;
    this.recipeUrl = recipeUrl;
    this.faviconUrl = faviconUrl;
    this.appName = appName;
  }
}

export type IRecipeRepository = {
  bulkInsert(recipes: RecipeBeforePersist[]): Promise<Recipe[]>;
};
