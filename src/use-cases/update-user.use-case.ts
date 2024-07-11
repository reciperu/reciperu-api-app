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
  private async processUserDto(user: User, updateUserDto: UpdateUserDto) {
    // 元の画像URLを保持
    const prevFilename = user.getFilename;
    let filename = prevFilename;
    if (!user) throw new HttpException('User not found', 404);
    // base64であれば、firebaseに画像をアップロード
    if (updateUserDto.imageUrl.includes('data:image')) {
      const { imageUrl, filename: updatedFilename } =
        await this.firebaseService.uploadProfileImageToStorage(
          'profile',
          updateUserDto.imageUrl,
          prevFilename,
        );
      if (imageUrl) {
        updateUserDto.imageUrl = imageUrl;
      }
      if (updatedFilename) {
        filename = updatedFilename;
      }
    }
    return {
      name: updateUserDto.name,
      imageUrl: updateUserDto.imageUrl,
      filename,
      activeStatus: updateUserDto.activeStatus,
    };
  }
  async execute(updateUserDto: UpdateUserDto, userId: string): Promise<User> {
    const user = await this.userRepository.findUser({ userId });
    const userDto = await this.processUserDto(user, updateUserDto);

    user.update(userDto);

    return await this.userRepository.update(user);
  }
}
