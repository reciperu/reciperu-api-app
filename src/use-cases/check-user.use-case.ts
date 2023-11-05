import { Injectable } from '@nestjs/common';
import { User, UserBeforePersist } from 'src/domain/models';
import { IUserRepository } from 'src/domain/repositories';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class CheckUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(user: User | null, token: string): Promise<User> {
    if (user) return user;
    const decodedToken = await this.firebaseService.admin
      .auth()
      .verifyIdToken(token);
    const userBeforePersist = new UserBeforePersist(
      decodedToken.name,
      decodedToken.picture,
      decodedToken.uid,
    );
    return await this.userRepository.create(userBeforePersist);
  }
}
