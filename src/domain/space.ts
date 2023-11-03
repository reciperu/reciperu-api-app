export class Space {
  readonly id: string;
  readonly recipeBookName: string;
  readonly recipeBookId: string;
  constructor({
    id,
    recipeBookName,
    recipeBookId,
  }: {
    id: string;
    recipeBookName: string;
    recipeBookId: string;
  }) {
    this.id = id;
    this.recipeBookName = recipeBookName;
    this.recipeBookId = recipeBookId;
    if (!this.id) throw new Error('id is required');
    if (!this.recipeBookName) throw new Error('recipeBookName is required');
    if (!this.recipeBookId) throw new Error('recipeBookId is required');
  }
}

export type SpaceBeforePersist = Omit<Space, 'id'>;

export type SpaceRepository = {
  create(space: SpaceBeforePersist): Promise<Space>;
};
