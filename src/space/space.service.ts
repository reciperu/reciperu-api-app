import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpsertSpaceDto } from './dto/upsertSpace.dto';
import { UserService } from 'src/user/user.service';
import { Space } from '@prisma/client';
@Injectable()
export class SpaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create({
    userId,
    upsertSpaceDto,
  }: {
    userId: number;
    upsertSpaceDto: UpsertSpaceDto;
  }) {
    const { name } = upsertSpaceDto;
    const user = await this.userService.findOneById(userId);
    if (user.spaceId)
      throw new HttpException('USER_ALREADY_HAS_SPACE', HttpStatus.BAD_REQUEST);
    const createdSpace = await this.prismaService.$transaction(async (tx) => {
      const space = await tx.space.create({
        data: {
          name,
        },
      });
      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          spaces: {
            connect: {
              id: space.id,
            },
          },
        },
      });
      return space;
    });
    return createdSpace;
  }

  async findOneById(id: number) {
    return await this.prismaService.space.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
  }

  async update({
    uuid,
    upsertSpaceDto,
  }: {
    uuid: string;
    upsertSpaceDto: UpsertSpaceDto;
  }) {
    const { name } = upsertSpaceDto;
    return await this.prismaService.space.update({
      where: {
        uuid,
      },
      data: {
        name,
      },
    });
  }
}
