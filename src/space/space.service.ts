import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpsertSpaceDto } from './dto/upsertSpace.dto';
import { UserService } from 'src/user/user.service';

// 後で修正
@Injectable()
export class SpaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly UserService: UserService,
  ) {}

  async create(upsertSpaceDto: UpsertSpaceDto) {
    const { name } = upsertSpaceDto;
    await this.prismaService.$transaction(async (tx) => {
      const space = await tx.space.create({
        data: {
          name,
        },
      });
      await tx.user.update({
        where: {
          id: 1,
          // TODO: ここはログインユーザーのIDを取得する
        },
        data: {
          spaces: {
            connect: {
              id: space.id,
            },
          },
        },
      });
    });
  }
}
