import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSpaceDto } from './dto/updateSpace.dto';
import { CreateSpaceDto } from './dto/createSpace.dto';
import { UserService } from 'src/user/user.service';
import { JoinSpaceDto } from './dto/joinSpace.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { SpaceEntity } from './entities/space.entity';

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

    const space = await this.findByNameAndPassword(createSpaceDto);
    if (space)
      throw new HttpException('SPACE_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);

    const createdSpace = await this.prismaService.$transaction(async (tx) => {
      const space = await tx.space.create({
        data: createSpaceDto,
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

  async join({
    userUuid,
    joinSpaceDto,
  }: {
    userUuid: string;
    joinSpaceDto: JoinSpaceDto;
  }) {
    const [user, space] = await Promise.all([
      this.userService.findOneByUuid(userUuid),
      this.findByNameAndPassword(joinSpaceDto),
    ]);

    this.validateJoin({ user, space });

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        spaceId: space.id,
        spaceRole: 'MEMBER',
      },
    });
    return await this.findOneById(space.id);
  }

  async findByNameAndPassword({
    name,
    password,
  }: {
    name: string;
    password: string;
  }) {
    return await this.prismaService.space.findUnique({
      where: {
        space_identifier: {
          name,
          password,
        },
      },
    });
  }

  async validateJoin({
    user,
    space,
  }: {
    user: UserEntity;
    space: SpaceEntity;
  }) {
    if (!user) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    if (user.spaceId)
      throw new HttpException('USER_ALREADY_HAS_SPACE', HttpStatus.BAD_REQUEST);
    if (user.spaceRole === 'OWNER')
      throw new HttpException('USER_IS_OWNER', HttpStatus.BAD_REQUEST);
    if (!space)
      throw new HttpException('SPACE_NOT_FOUND', HttpStatus.NOT_FOUND);
    return true;
  }
}
