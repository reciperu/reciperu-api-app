import { Injectable } from '@nestjs/common';
import { User, UserBeforePersist, IUserRepository } from 'src/domain';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import { uploadImageToStorage } from 'src/functions/image';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(user: User | null, token: string): Promise<User> {
    if (user) return user;
    const decodedToken = await this.firebaseService.admin
      .auth()
      .verifyIdToken(token);

    // TODO: uidが同じものが存在する場合はエラーを返す？
    const userObject = {
      name: decodedToken.name,
      imageUrl: '',
      filename: '',
      uid: decodedToken.uid,
    };
    const picture = decodedToken.picture;

    if (picture?.length) {
      // storageに登録
      const storage = this.firebaseService.admin.storage();
      const { imageUrl, filename } = await uploadImageToStorage(
        storage,
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
    const userBeforePersist = new UserBeforePersist(userObject);
    return await this.userRepository.create(userBeforePersist);
  }
}
