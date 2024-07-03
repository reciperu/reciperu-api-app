import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/controllers/user/user.dto';
import { User, IUserRepository } from 'src/domain';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(updateUserDto: UpdateUserDto, userId: string): Promise<User> {
    const user = await this.userRepository.findUser({ userId });
    if (!user) throw new HttpException('User not found', 404);
    // base64であれば、firebaseに画像をアップロード
    if (updateUserDto.imageUrl.includes('data:image')) {
      // const imageUrl = await this.userRepository.uploadImage(
      //   updateUserDto.imageUrl,
      //   user.getId,
      // );
      // base64エンコードされた画像をデコード
      const ext = updateUserDto.imageUrl.split(';')[0].split('/')[1];
      const buffer = Buffer.from(updateUserDto.imageUrl, 'base64');
      const fileName = `profile/${randomUUID()}.${ext}`;
      const blob = this.firebaseService.admin.storage().bucket().file(fileName);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: 'image/' + ext,
        },
      });
      try {
        await new Promise((resolve, reject) => {
          blobStream.on('finish', resolve);
          blobStream.on('error', reject);
          blobStream.end(buffer);
        });
        const publicUrl = `https://storage.googleapis.com/${
          this.firebaseService.admin.storage().bucket().name
        }/${fileName}`;
        updateUserDto.imageUrl = publicUrl;
      } catch (error) {
        throw new HttpException(
          `Unable to upload image, something went wrong: ${error}`,
          500,
        );
      }
    }
    user.update({
      name: updateUserDto.name,
      imageUrl: updateUserDto.imageUrl,
      activeStatus: updateUserDto.activeStatus,
    });
    return await this.userRepository.update(user);
  }
}
