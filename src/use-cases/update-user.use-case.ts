import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/controllers/user/user.dto';
import { User, IUserRepository } from 'src/domain';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import { uploadImageToStorage } from 'src/functions/image';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(updateUserDto: UpdateUserDto, userId: string): Promise<User> {
    const user = await this.userRepository.findUser({ userId });
    // 元の画像URLを保持
    const prevFilename = user.getFilename;
    let filename = prevFilename;
    if (!user) throw new HttpException('User not found', 404);
    // base64であれば、firebaseに画像をアップロード
    if (updateUserDto.imageUrl.includes('data:image')) {
      const storage = this.firebaseService.admin.storage();
      const { imageUrl, filename: updatedFilename } =
        await uploadImageToStorage(
          storage,
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
    user.update({
      name: updateUserDto.name,
      imageUrl: updateUserDto.imageUrl,
      filename,
      activeStatus: updateUserDto.activeStatus,
    });
    return await this.userRepository.update(user);
  }
}
