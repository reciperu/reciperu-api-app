export class RecipeBook {
  private id: string;
  private name: string;
  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }
}
