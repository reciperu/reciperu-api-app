import { Injectable } from '@nestjs/common';
import {
  MenuBeforePersist,
  IMenuRepository,
  Menu,
  Recipe,
  MenuStatus,
  MenuStatusKey,
} from 'src/domain';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';

const prismaMenuType = async (prisma: PrismaClient, menuId: string) =>
  await prisma.menu.findUnique({
    where: { menuId },
    include: {
      recipe: true,
    },
  });

type PrismaMenuType = NonNullable<Awaited<ReturnType<typeof prismaMenuType>>>;

@Injectable()
export class PrismaMenuRepository implements IMenuRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMenus({
    spaceId,
    cursor,
    statuses,
  }: {
    spaceId: string;
    cursor?: string;
    statuses?: MenuStatusKey[];
  }): Promise<Menu[]> {
    const prismaMenus = await this.prismaService.menu.findMany({
      where: {
        spaceId,
        status: { in: statuses },
      },
      include: {
        recipe: true,
      },
      take: 20,
      ...(cursor && { cursor: { menuId: cursor }, skip: 1 }),
      orderBy: {
        createdAt: 'desc',
      },
    });
    return prismaMenus.map((prismaMenu) => this.toMenu(prismaMenu));
  }

  async save(menu: MenuBeforePersist | Menu) {
    const prismaMenu = await this.prismaService.menu.upsert({
      where: { menuId: 'id' in menu ? menu.getId : '' },
      create: {
        userId: menu.getUserId,
        scheduledAt: menu.getScheduledAt,
        recipeId: menu.getRecipeId,
        spaceId: menu.getSpaceId,
      },
      update: {
        userId: menu.getUserId,
        scheduledAt: menu.getScheduledAt,
        recipeId: menu.getRecipeId,
        status: 'id' in menu ? menu.getStatus : 'PENDING',
      },
      include: {
        recipe: true,
      },
    });
    return this.toMenu(prismaMenu);
  }

  async findMenu(menuId: string): Promise<Menu> {
    const prismaMenu = await this.prismaService.menu.findUnique({
      where: { menuId },
      include: {
        recipe: true,
      },
    });
    return this.toMenu(prismaMenu);
  }

  async delete(menuId: string): Promise<void> {
    await this.prismaService.menu.delete({
      where: { menuId },
    });
  }

  private toMenu(prismaMenu: PrismaMenuType) {
    return new Menu({
      id: prismaMenu.menuId,
      userId: prismaMenu.userId,
      scheduledAt: prismaMenu.scheduledAt,
      recipeId: prismaMenu.recipeId,
      status: prismaMenu.status as MenuStatus,
      createdAt: prismaMenu.createdAt,
      spaceId: prismaMenu.spaceId,
      recipe: new Recipe({
        id: prismaMenu.recipe.recipeId,
        title: prismaMenu.recipe.title,
        spaceId: prismaMenu.recipe.spaceId,
        userId: prismaMenu.recipe.userId,
        thumbnailUrl: prismaMenu.recipe.thumbnailUrl,
        imageUrls: prismaMenu.recipe.imageUrls
          ? prismaMenu.recipe.imageUrls.split(',')
          : null,
        memo: prismaMenu.recipe.memo,
        recipeUrl: prismaMenu.recipe.recipeUrl,
        faviconUrl: prismaMenu.recipe.faviconUrl,
        appName: prismaMenu.recipe.appName,
        createdAt: prismaMenu.recipe.createdAt,
      }),
    });
  }
}
