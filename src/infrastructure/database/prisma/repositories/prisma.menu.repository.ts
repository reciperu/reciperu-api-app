import { Injectable } from '@nestjs/common';
import {
  MenuBeforePersist,
  IMenuRepository,
  Menu,
  Recipe,
  MenuStatus,
} from 'src/domain';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';

const prismaMenuType = async (prisma: PrismaClient, id: string) =>
  await prisma.menu.findUnique({
    where: { id },
    include: {
      recipe: true,
    },
  });

type PrismaMenuType = NonNullable<Awaited<ReturnType<typeof prismaMenuType>>>;

@Injectable()
export class PrismaMenuRepository implements IMenuRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(menu: MenuBeforePersist | Menu) {
    const prismaMenu = await this.prismaService.menu.upsert({
      where: { id: 'id' in menu ? menu.getId : '' },
      create: {
        userId: menu.getUserId,
        scheduledAt: menu.getScheduledAt,
        recipeId: menu.getRecipeId,
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

  async findMenu(id: string): Promise<Menu> {
    const prismaMenu = await this.prismaService.menu.findUnique({
      where: { id },
      include: {
        recipe: true,
      },
    });
    return this.toMenu(prismaMenu);
  }

  private toMenu(prismaMenu: PrismaMenuType) {
    return new Menu({
      id: prismaMenu.id,
      userId: prismaMenu.userId,
      scheduledAt: prismaMenu.scheduledAt,
      recipeId: prismaMenu.recipeId,
      status: prismaMenu.status as MenuStatus,
      createdAt: prismaMenu.createdAt,
      recipe: new Recipe({
        id: prismaMenu.recipe.id,
        title: prismaMenu.recipe.title,
        recipeBookId: prismaMenu.recipe.recipeBookId,
        userId: prismaMenu.recipe.userId,
        thumbnailUrl: prismaMenu.recipe.thumbnailUrl,
        imageUrls: prismaMenu.recipe.imageUrls
          ? prismaMenu.recipe.imageUrls.split(',')
          : null,
        memo: prismaMenu.recipe.memo,
        isFavorite: prismaMenu.recipe.isFavorite,
        recipeUrl: prismaMenu.recipe.recipeUrl,
        faviconUrl: prismaMenu.recipe.faviconUrl,
        appName: prismaMenu.recipe.appName,
        createdAt: prismaMenu.recipe.createdAt,
      }),
    });
  }
}
