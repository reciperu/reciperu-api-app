import { Injectable } from '@nestjs/common';
import {
  Menu,
  CreateMenuDto,
  IMenuRepository,
  MenuBeforePersist,
} from 'src/domain';

@Injectable()
export class CreateMenuUseCase {
  constructor(private readonly menuRepository: IMenuRepository) {}

  async execute(createMenuDto: CreateMenuDto, userId: string): Promise<Menu> {
    return await this.menuRepository.save(
      new MenuBeforePersist({
        userId,
        recipeId: createMenuDto.recipeId,
        scheduledAt: createMenuDto.scheduledAt,
      }),
    );
  }
}
