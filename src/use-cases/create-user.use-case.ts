import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/controllers/user/user.dto';
import { IUserRepository } from 'src/domain/repositories';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(dto: CreateUserDto, token: string) {
    const decodedToken = await this.firebaseService.admin
      .auth()
      .verifyIdToken(token);
    return await this.userRepository.create({
      ...dto,
      uid: decodedToken.uid,
    });
  }
}
