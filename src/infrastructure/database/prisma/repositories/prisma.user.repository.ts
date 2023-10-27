import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { IUserRepository } from 'src/domain/repositories';
import { User, UserBeforePersist } from 'src/domain/models';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async findAll(spaceId: string): Promise<User[]> {
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
        identifier: user.identifier,
      },
    });
    return this.toUser(prismaUser);
  }

  private toUser(user: PrismaUser) {
    return new User(user);
  }
}
