// https://www.figma.com/file/abtd8Q2nvB4mdGCHQda0Sk/Sharely%EF%BC%88%E6%97%A7%E3%83%AC%E3%82%B7%E3%83%94%E3%83%AB%EF%BC%89?type=design&node-id=2541-1909&mode=design&t=CE69ANlZGFZoYLAf-4
// 料理食べたいときはレコード作成
// 料理食べたくない時はレコード削除
// レシピ取得で食べたい料理を取得して、レコードがあれば食べたい料理として返す
// https://www.figma.com/file/abtd8Q2nvB4mdGCHQda0Sk/Sharely%EF%BC%88%E6%97%A7%E3%83%AC%E3%82%B7%E3%83%94%E3%83%AB%EF%BC%89?type=design&node-id=3212-2534&mode=design&t=CE69ANlZGFZoYLAf-4
// 食べたい料理一覧を取得する
// スペースに所属するユーザーを取得する
// ユーザーidを指定して、食べたい量を取得する・レシピをジョインして取得する
import { Injectable } from '@nestjs/common';
import { IRequestedRecipeRepository } from 'src/domain';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRequestedRecipeRepository
  implements IRequestedRecipeRepository
{
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async create(userId: string, recipeId: string): Promise<void> {
    console.log('userId', userId);
    console.log('recipeId', recipeId);
    await this.prismaService.requestedRecipe.create({
      data: {
        userId,
        recipeId,
      },
    });
  }
}
