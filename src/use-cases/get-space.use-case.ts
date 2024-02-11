import { Injectable } from '@nestjs/common';
import { Space, ISpaceRepository } from 'src/domain';

@Injectable()
export class GetSpaceUseCase {
  constructor(private readonly spaceRepository: ISpaceRepository) {}
  async execute(id: string): Promise<Space> {
    return await this.spaceRepository.findSpace(id);
  }
}
