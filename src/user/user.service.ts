import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly prismaService: PrismaService,
  ) {}
  async create(token: string) {
    const decodedToken = await this.firebaseService.admin
      .auth()
      .verifyIdToken(token);

    const user = await this.prismaService.user.findUnique({
      where: {
        uid: decodedToken.uid,
      },
    });
    if (user) {
      throw new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.prismaService.user.create({
      data: {
        name: decodedToken.name as string,
        imageUrl: (decodedToken.imageUrl as string) || '',
        uid: decodedToken.uid,
      },
    });
    return newUser;
  }
}
