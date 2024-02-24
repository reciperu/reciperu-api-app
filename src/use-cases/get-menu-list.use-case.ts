import { Injectable } from '@nestjs/common';
import { IMenuRepository } from 'src/domain';

@Injectable()
export class GetMenuListUseCase {
  constructor(private readonly menuRepository: IMenuRepository) {}
  async execute(spaceId: string, cursor: string | undefined) {
    return await this.menuRepository.findMenus(spaceId, cursor);
  }
}
