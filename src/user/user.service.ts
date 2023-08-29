import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly prismaService: PrismaService,
  ) {}
  async findOneByUuid(uuid: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        uuid,
      },
    });
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOneById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }

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

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        uuid,
      },
      data: {
        ...updateUserDto,
      },
    });
  }
}
