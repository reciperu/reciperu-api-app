import { Injectable } from '@nestjs/common';
import { ISpaceRepository, IUserRepository, UpdateSpaceDto } from 'src/domain';

@Injectable()
export class UpdateSpaceUseCase {
  constructor(
    private readonly spaceRepository: ISpaceRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(id: string, updateSpaceDto: UpdateSpaceDto, userId: string) {
    const user = await this.userRepository.findUser({ userId });
    user.canUpdateSpace();
    const space = await this.spaceRepository.findSpace(id);
    space.update(updateSpaceDto);
    return await this.spaceRepository.updateSpace(space);
  }
}
