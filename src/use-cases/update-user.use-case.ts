import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/controllers/user/user.dto';
import { User } from 'src/domain/models';

import { IUserRepository } from 'src/domain/repositories';
@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    console.log('usecase', updateUserDto);

    const user = await this.userRepository.findUser({ id });
    if (!user) throw new HttpException('User not found', 404);

    user.update({
      name: updateUserDto.name,
      imageUrl: updateUserDto.imageUrl,
      activeStatus: updateUserDto.activeStatus,
    });
    return await this.userRepository.update(user);
  }
}
