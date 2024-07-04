import { Injectable } from '@nestjs/common';
import { IRecipeRepository, UpdateRecipeDto } from 'src/domain';
import {
  deleteImageFromStorage,
  uploadImageToStorage,
} from 'src/functions/image';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class UpdateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(id: string, updateRecipesDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findRecipe(id);
    const prevImageUrls = recipe.getImageUrls || [];
    const prevImageFilenames = recipe.getImageFilenames || [];
    const recipeObject = {
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
    const storage = this.firebaseService.admin.storage();
    // thumbnailUrlが登録済のデータと異なる場合はstorageに登録
    if (updateRecipesDto.thumbnailUrl !== recipe.getThumbnailUrl) {
      const { imageUrl, filename } = await uploadImageToStorage(
        storage,
        'recipe',
        updateRecipesDto.thumbnailUrl,
        recipe.getThumbnailFilename,
      );
      if (imageUrl) {
        recipeObject.thumbnailUrl = imageUrl;
      }
      if (filename) {
        recipeObject.thumbnailFilename = filename;
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
      await deleteImageFromStorage(storage, targetFilename);
      // recipeObjectから削除
      recipeObject.imageUrls = recipeObject.imageUrls.filter(
        (x) => x !== imageUrl,
      );
      recipeObject.imageFilenames = recipeObject.imageFilenames.filter(
        (x) => x !== targetFilename,
      );
    });

    // 画像のアップロード
    const uploadPromises = uploadImageUrlQueue.map(async (imageUrl) => {
      const { imageUrl: newImageUrl, filename: newFilename } =
        await uploadImageToStorage(storage, 'recipe', imageUrl, '');
      if (newImageUrl) {
        recipeObject.imageUrls = [...recipeObject.imageUrls, newImageUrl];
      }
      if (newFilename) {
        recipeObject.imageFilenames = [
          ...recipeObject.imageFilenames,
          newFilename,
        ];
      }
    });

    // すべての削除とアップロードが完了するのを待つ
    await Promise.all(deletePromises);
    await Promise.all(uploadPromises);
    recipe.update(recipeObject);
    return await this.recipeRepository.save(recipe);
  }
}
