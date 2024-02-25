import { Injectable } from '@nestjs/common';
import { IMenuRepository, MenuStatusKey } from 'src/domain';

@Injectable()
export class GetMenuListUseCase {
  constructor(private readonly menuRepository: IMenuRepository) {}
  async execute({
    spaceId,
    cursor,
    statuses,
  }: {
    spaceId: string;
    cursor: string | undefined;
    statuses?: MenuStatusKey[];
  }) {
    return await this.menuRepository.findMenus({ spaceId, cursor, statuses });
  }
}
