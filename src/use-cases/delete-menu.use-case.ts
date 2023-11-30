import { Injectable } from '@nestjs/common';
import { IMenuRepository } from 'src/domain';

@Injectable()
export class DeleteMenuUseCase {
  constructor(private readonly menuRepository: IMenuRepository) {}
  async execute(id: string) {
    return await this.menuRepository.delete(id);
  }
}
