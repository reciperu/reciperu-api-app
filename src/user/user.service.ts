import { Injectable } from '@nestjs/common';
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

    const user = await this.prismaService.user.create({
      data: {
        name: decodedToken.name,
        imageUrl: decodedToken.imageUrl || '',
      },
    });
    return user;
  }
}
