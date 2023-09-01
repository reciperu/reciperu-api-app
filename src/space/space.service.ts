import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSpaceDto } from './dto/updateSpace.dto';
import { CreateSpaceDto } from './dto/createSpace.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SpaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create({
    userId,
    createSpaceDto,
  }: {
    userId: number;
    createSpaceDto: CreateSpaceDto;
  }) {
    const user = await this.userService.findOneById(userId);
    if (user.spaceId)
      throw new HttpException('USER_ALREADY_HAS_SPACE', HttpStatus.BAD_REQUEST);
    const createdSpace = await this.prismaService.$transaction(async (tx) => {
      const space = await tx.space.create({
        data: createSpaceDto,
      });
      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          isOwner: true,
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
    updateSpaceDto,
  }: {
    uuid: string;
    updateSpaceDto: UpdateSpaceDto;
  }) {
    return await this.prismaService.space.update({
      where: {
        uuid,
      },
      data: updateSpaceDto,
    });
  }
}
