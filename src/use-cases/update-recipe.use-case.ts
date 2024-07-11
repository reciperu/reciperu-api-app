import { Injectable } from '@nestjs/common';
import { IRecipeRepository, Recipe, UpdateRecipeDto } from 'src/domain';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class UpdateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  private async processRecipeDto(
    recipe: Recipe,
    updateRecipesDto: UpdateRecipeDto,
  ) {
    const prevImageUrls = recipe.getImageUrls || [];
    const prevImageFilenames = recipe.getImageFilenames || [];
    const recipeDto = {
      title: updateRecipesDto.title,
      thumbnailUrl: recipe.getThumbnailUrl,
      thumbnailFilename: recipe.getThumbnailFilename,
      imageUrls: prevImageUrls,
      imageFilenames: prevImageFilenames,
      memo: updateRecipesDto.memo,
      recipeUrl: updateRecipesDto.recipeUrl,
      faviconUrl: updateRecipesDto.faviconUrl,
      appName: updateRecipesDto.appName,
    };
    // thumbnailUrlが登録済のデータと異なる場合はstorageに登録
    if (updateRecipesDto.thumbnailUrl !== recipe.getThumbnailUrl) {
      const { imageUrl, filename } =
        await this.firebaseService.uploadProfileImageToStorage(
          'recipe',
          updateRecipesDto.thumbnailUrl,
          recipe.getThumbnailFilename,
        );
      if (imageUrl) {
        recipeDto.thumbnailUrl = imageUrl;
      }
      if (filename) {
        recipeDto.thumbnailFilename = filename;
      }
    }

    // imageUrlsが登録済のデータと異なる場合はstorageに登録・削除
    const uploadImageUrlQueue = [];
    const deleteImageUrlQueue = [];

    const newImageUrls = updateRecipesDto.imageUrls;

    // アップロード予定の画像がある場合
    // すでに登録済みの画像を削除する
    prevImageUrls.forEach((prevImageUrl) => {
      if (newImageUrls.indexOf(prevImageUrl) === -1) {
        deleteImageUrlQueue.push(prevImageUrl);
      }
    });
    // 新たに登録する画像をアップロードする
    newImageUrls.forEach((newImageUrl) => {
      if (prevImageUrls.indexOf(newImageUrl) === -1) {
        uploadImageUrlQueue.push(newImageUrl);
      }
    });

    // 画像の削除
    const deletePromises = deleteImageUrlQueue.map(async (imageUrl) => {
      const index = prevImageUrls.findIndex((x) => x === imageUrl);
      const targetFilename = prevImageFilenames[index];
      // storageから削除
      await this.firebaseService.deleteImageFromStorage(targetFilename);
      // recipeDtoから削除
      recipeDto.imageUrls = recipeDto.imageUrls.filter((x) => x !== imageUrl);
      recipeDto.imageFilenames = recipeDto.imageFilenames.filter(
        (x) => x !== targetFilename,
      );
    });

    // 画像のアップロード
    const uploadPromises = uploadImageUrlQueue.map(async (imageUrl) => {
      const { imageUrl: newImageUrl, filename: newFilename } =
        await this.firebaseService.uploadProfileImageToStorage(
          'recipe',
          imageUrl,
          '',
        );
      if (newImageUrl) {
        recipeDto.imageUrls = [...recipeDto.imageUrls, newImageUrl];
      }
      if (newFilename) {
        recipeDto.imageFilenames = [...recipeDto.imageFilenames, newFilename];
      }
    });

    // すべての削除とアップロードが完了するのを待つ
    await Promise.all(deletePromises);
    await Promise.all(uploadPromises);

    return recipeDto;
  }

  async execute(id: string, updateRecipesDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findRecipe(id);
    const recipeDto = await this.processRecipeDto(recipe, updateRecipesDto);

    recipe.update(recipeDto);

    return await this.recipeRepository.save(recipe);
  }
}
