import { Injectable } from '@nestjs/common';
import {
  MenuBeforePersist,
  IMenuRepository,
  Menu,
  MenuStatus,
  MenuStatusKey,
} from 'src/domain';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';
import { PrismaRecipeRepository } from './prisma.recipe.repository';

const prismaMenuType = async (prisma: PrismaClient, menuId: string) =>
  await prisma.menu.findUnique({
    where: { menuId },
    include: {
      recipe: {
        include: {
          requestedRecipes: true,
          user: true,
        },
      },
    },
  });

type PrismaMenuType = NonNullable<Awaited<ReturnType<typeof prismaMenuType>>>;

@Injectable()
export class PrismaMenuRepository implements IMenuRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prismaRecipeRepository: PrismaRecipeRepository,
  ) {}

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
        recipe: {
          include: {
            requestedRecipes: true,
            user: true,
          },
        },
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
        recipe: {
          include: {
            requestedRecipes: true,
            user: true,
          },
        },
      },
    });
    return this.toMenu(prismaMenu);
  }

  async findMenu(menuId: string): Promise<Menu> {
    const prismaMenu = await this.prismaService.menu.findUnique({
      where: { menuId },
      include: {
        recipe: {
          include: {
            requestedRecipes: true,
            user: true,
          },
        },
      },
    });
    return this.toMenu(prismaMenu);
  }

  async delete(menuId: string): Promise<void> {
    await this.prismaService.menu.delete({
      where: { menuId },
    });
  }

  toMenu(prismaMenu: PrismaMenuType) {
    return new Menu({
      id: prismaMenu.menuId,
      userId: prismaMenu.userId,
      scheduledAt: prismaMenu.scheduledAt,
      recipeId: prismaMenu.recipeId,
      status: prismaMenu.status as MenuStatus,
      createdAt: prismaMenu.createdAt,
      spaceId: prismaMenu.spaceId,
      recipe: this.prismaRecipeRepository.toRecipe(prismaMenu.recipe),
    });
  }
}
