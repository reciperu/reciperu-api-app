import { Injectable } from '@nestjs/common';
import { IMenuRepository, UpdateMenuDto } from 'src/domain';

@Injectable()
export class UpdateMenuUseCase {
  constructor(private readonly menuRepository: IMenuRepository) {}
  async execute(menuId: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.findMenu(menuId);
    menu.update(updateMenuDto);
    return await this.menuRepository.save(menu);
  }
}
