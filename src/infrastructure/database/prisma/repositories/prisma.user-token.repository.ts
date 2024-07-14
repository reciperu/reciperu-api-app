import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  IUserTokenRepository,
  UserTokenBeforePersist,
  UserToken,
} from 'src/domain';
import { UserToken as PrismaUserToken } from '@prisma/client';

@Injectable()
export class PrismaUserTokenRepository implements IUserTokenRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async save(
    userToken: UserToken | UserTokenBeforePersist,
  ): Promise<UserToken> {
    const prismaUserToken = await this.prismaService.userToken.upsert({
      where: {
        userTokenId: 'id' in userToken ? userToken.getId : '',
      },
      create: {
        token: userToken.getToken,
        deviceId: userToken.getDeviceId,
        userId: userToken.getUserId,
      },
      update: {
        token: userToken.getToken,
        deviceId: userToken.getDeviceId,
        userId: userToken.getUserId,
      },
    });

    return this.toUserToken(prismaUserToken);
  }

  async findUserToken(
    userId: number,
    deviceId: string,
  ): Promise<UserToken | null> {
    const prismaUserToken = await this.prismaService.userToken.findFirst({
      where: {
        userId,
        deviceId,
      },
    });
    if (!prismaUserToken) {
      return null;
    }
    return this.toUserToken(prismaUserToken);
  }

  async findUserTokens(userId: number): Promise<UserToken[] | null> {
    const prismaUserTokens = await this.prismaService.userToken.findMany({
      where: {
        userId,
      },
    });
    if (!prismaUserTokens.length) {
      return null;
    }
    return prismaUserTokens.map((prismaUserToken) =>
      this.toUserToken(prismaUserToken),
    );
  }

  private toUserToken(prismaUserToken: PrismaUserToken) {
    return new UserToken({
      id: prismaUserToken.userTokenId,
      token: prismaUserToken.token,
      deviceId: prismaUserToken.deviceId,
      lastActive: prismaUserToken.lastActive,
      userId: prismaUserToken.userId,
    });
  }
}
