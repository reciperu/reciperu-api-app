import { User } from './user';

export class RecipeBeforePersist {
  private title: string;
  private spaceId: number;
  private userId: number;
  private thumbnailUrl?: string;
  private thumbnailFilename?: string;
  private imageUrls?: string[];
  private imageFilenames?: string[];
  private memo?: string;
  private recipeUrl?: string;
  private faviconUrl?: string;
  private appName?: string;

  constructor({
    title,
    spaceId,
    userId,
    thumbnailUrl,
    thumbnailFilename,
    imageUrls,
    imageFilenames,
    memo,
    recipeUrl,
    faviconUrl,
    appName,
  }: {
    title: string;
    spaceId: number;
    userId: number;
    thumbnailUrl?: string;
    thumbnailFilename?: string;
    imageUrls?: string[];
    imageFilenames?: string[];
    memo?: string;
    recipeUrl?: string;
    faviconUrl?: string;
    appName?: string;
  }) {
    this.title = title;
    this.spaceId = spaceId;
    this.userId = userId;
    this.thumbnailUrl = thumbnailUrl;
    this.thumbnailFilename = thumbnailFilename;
    this.imageUrls = imageUrls;
    this.imageFilenames = imageFilenames;
    this.memo = memo;
    this.recipeUrl = recipeUrl;
    this.faviconUrl = faviconUrl;
    this.appName = appName;
  }

  get getTitle(): string {
    return this.title;
  }

  get getSpaceId(): number {
    return this.spaceId;
  }

  get getUserId(): number {
    return this.userId;
  }

  get getThumbnailUrl(): string | undefined {
    return this.thumbnailUrl;
  }

  get getThumbnailFilename(): string | undefined {
    return this.thumbnailFilename;
  }

  get getImageUrls(): string[] | undefined {
    return this.imageUrls;
  }

  get getImageFilenames(): string[] | undefined {
    return this.imageFilenames;
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

  set setThumbnailFilename(thumbnailFilename: string) {
    this.thumbnailFilename = thumbnailFilename;
  }

  set setImageUrls(imageUrls: string[]) {
    this.imageUrls = imageUrls;
  }

  set setImageFilenames(imageFilenames: string[]) {
    this.imageFilenames = imageFilenames;
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

  set setSpaceId(spaceId: number) {
    this.spaceId = spaceId;
  }
}

export class RecipeRequester {
  private userId: number;
  constructor({ userId }: { userId: number }) {
    this.userId = userId;
  }
  get getUserId(): number {
    return this.userId;
  }
}
export class Recipe extends RecipeBeforePersist {
  private id: number;
  private createdAt: Date;
  private requesters: RecipeRequester[];
  private user: User;
  constructor({
    id,
    title,
    spaceId,
    userId,
    thumbnailUrl,
    thumbnailFilename,
    imageUrls,
    imageFilenames,
    memo,
    recipeUrl,
    faviconUrl,
    appName,
    createdAt,
    requesters,
    user,
  }: {
    id: number;
    title: string;
    spaceId: number;
    userId: number;
    thumbnailUrl?: string;
    thumbnailFilename?: string;
    imageUrls?: string[];
    imageFilenames?: string[];
    memo?: string;
    recipeUrl?: string;
    faviconUrl?: string;
    appName?: string;
    createdAt: Date;
    requesters?: RecipeRequester[];
    user?: User;
  }) {
    super({
      title,
      spaceId,
      userId,
      thumbnailUrl,
      thumbnailFilename,
      imageUrls,
      imageFilenames,
      memo,
      recipeUrl,
      faviconUrl,
      appName,
    });
    this.id = id;
    this.createdAt = createdAt;
    this.requesters = requesters;
    this.user = user;
  }
  get getId(): number {
    return this.id;
  }
  get getCreatedAt(): Date {
    return this.createdAt;
  }

  get getRequesters(): RecipeRequester[] {
    return this.requesters;
  }

  get getUser(): User {
    return this.user;
  }

  update({
    title,
    thumbnailUrl,
    thumbnailFilename,
    imageUrls,
    imageFilenames,
    memo,
    recipeUrl,
    faviconUrl,
    appName,
  }: {
    title: string;
    thumbnailUrl: string;
    thumbnailFilename: string;
    imageUrls: string[];
    imageFilenames: string[];
    memo: string;
    recipeUrl: string;
    faviconUrl: string;
    appName: string;
  }) {
    this.setTitle = title;
    this.setThumbnailUrl = thumbnailUrl;
    this.setThumbnailFilename = thumbnailFilename;
    this.setImageUrls = imageUrls;
    this.setImageFilenames = imageFilenames;
    this.setMemo = memo;
    this.setRecipeUrl = recipeUrl;
    this.setFaviconUrl = faviconUrl;
    this.setAppName = appName;
  }
}

export type IRecipeRepository = {
  findRecipe(recipeId: number): Promise<Recipe>;
  bulkInsert(recipes: RecipeBeforePersist[]): Promise<Recipe[]>;
  save(recipe: Recipe | RecipeBeforePersist): Promise<Recipe>;
  findRecipes(
    spaceId: number,
    findRecipeOptions?: FindRecipeOptions,
  ): Promise<Recipe[]>;
  findRequestedRecipes(spaceId: number): Promise<Recipe[]>;
};

export type IRequestedRecipeRepository = {
  create(userId: number, recipeId: number): Promise<void>;
  delete(userId: number, recipeId: number): Promise<void>;
};

export type UpdateRecipeDto = {
  title: string;
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
  cursor?: number;
  requestUserId?: number;
  title?: string;
  userId?: number;
};

export type CreateRequestedRecipeDto = {
  recipeId: number;
};
