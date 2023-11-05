import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { IUserRepository } from 'src/domain/repositories';
import { ActiveStatus, User, UserBeforePersist } from 'src/domain/models';
import { User as PrismaUser } from '@prisma/client';
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async findMany(spaceId: string): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        spaceUsers: {
          some: {
            spaceId: spaceId,
          },
        },
      },
    });
    return users.map((user) => this.toUser(user));
  }

  async create(user: UserBeforePersist): Promise<User> {
    const prismaUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        imageUrl: user.imageUrl,
        uid: user.uid,
      },
    });
    return this.toUser(prismaUser);
  }

  async findById(uid: string): Promise<null | User> {
    const user = await this.prismaService.user.findUnique({
      where: { uid: uid },
    });
    if (!user) {
      return null;
    }
    return this.toUser(user);
  }

  private toUser(user: PrismaUser) {
    return new User(
      user.id,
      user.name,
      user.imageUrl,
      user.uid,
      user.activeStatus as ActiveStatus,
    );
  }
}
