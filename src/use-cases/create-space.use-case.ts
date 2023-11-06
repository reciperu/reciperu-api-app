import { Injectable } from '@nestjs/common';
import { ISpaceRepository, SpaceBeforePersist } from 'src/domain';
@Injectable()
export class CreateSpaceUseCase {
  constructor(private readonly spaceRepository: ISpaceRepository) {}
  async execute(arg: { recipeBookName: string; userId: string }) {
    const { recipeBookName, userId } = arg;
    const spaceBeforePersist = new SpaceBeforePersist(recipeBookName, userId);
    return await this.spaceRepository.insert(spaceBeforePersist);
  }
}
