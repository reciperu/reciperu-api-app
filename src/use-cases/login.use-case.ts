import { Injectable } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { User, UserBeforePersist, IUserRepository } from 'src/domain';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  private async processUserDto(decodedToken: DecodedIdToken) {
    const { name, uid, picture } = decodedToken;
    const userObject = {
      name,
      imageUrl: '',
      filename: '',
      uid,
    };

    if (picture?.length) {
      // storageに登録
      const { imageUrl, filename } =
        await this.firebaseService.uploadProfileImageToStorage(
          'profile',
          picture,
          '',
        );
      if (imageUrl) {
        userObject.imageUrl = imageUrl;
      }
      if (filename) {
        userObject.filename = filename;
      }
    }
    return new UserBeforePersist(userObject);
  }

  async execute(user: User | null, token: string): Promise<User> {
    if (user) return user;
    const decodedToken = await this.firebaseService.admin
      .auth()
      .verifyIdToken(token);
    const userDto = await this.processUserDto(decodedToken);
    return await this.userRepository.create(userDto);
  }
}
