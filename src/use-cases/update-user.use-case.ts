import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/controllers/user/user.dto';
import { User, IUserRepository } from 'src/domain';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(
    updateUserDto: UpdateUserDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<User> {
    const user = await this.userRepository.findUser({ userId });
    if (!user) throw new HttpException('User not found', 404);
    // const profileImageUrl = await this.firebaseService.uploadFile(file);
    user.update({
      name: updateUserDto.name,
      imageUrl: '',
      activeStatus: updateUserDto.activeStatus,
    });
    return await this.userRepository.update(user);
  }
}
