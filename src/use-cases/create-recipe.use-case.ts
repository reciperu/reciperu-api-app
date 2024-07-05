import { Injectable } from '@nestjs/common';
import {
  IRecipeRepository,
  RecipeBeforePersist,
  CreateRecipeDto,
} from 'src/domain';
import { uploadImageToStorage } from 'src/functions/image';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
@Injectable()
export class CreateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(
    createRecipesDto: CreateRecipeDto,
    userId: string,
    spaceId: string,
  ) {
    const recipeObject = {
      title: createRecipesDto.title,
      spaceId,
      userId: userId,
      thumbnailUrl: createRecipesDto.thumbnailUrl,
      thumbnailFilename: '',
      imageUrls: createRecipesDto.imageUrls,
      imageFilenames: [],
      memo: createRecipesDto.memo,
      recipeUrl: createRecipesDto.recipeUrl,
      faviconUrl: createRecipesDto.faviconUrl,
      appName: createRecipesDto.appName,
    };
    const storage = this.firebaseService.admin.storage();
    // thumbnailUrlがある場合はstorageに登録
    if (createRecipesDto.thumbnailUrl.length) {
      const { imageUrl, filename } = await uploadImageToStorage(
        storage,
        'recipe',
        createRecipesDto.thumbnailUrl,
        '',
      );
      if (imageUrl) {
        recipeObject.thumbnailUrl = imageUrl;
      }
      if (filename) {
        recipeObject.thumbnailFilename = filename;
      }
    }
    // imageUrlsがbase64の場合はstorageに登録
    if (createRecipesDto.imageUrls.length) {
      for (let i = 0; i < createRecipesDto.imageUrls.length; i++) {
        if (createRecipesDto.imageUrls[i].length) {
          const { imageUrl, filename } = await uploadImageToStorage(
            storage,
            'recipe',
            createRecipesDto.imageUrls[i],
            '',
          );
          if (imageUrl) {
            recipeObject.imageUrls[i] = imageUrl;
          }
          if (filename) {
            recipeObject.imageFilenames[i] = filename;
          }
        }
      }
    }
    return await this.recipeRepository.save(
      new RecipeBeforePersist(recipeObject),
    );
  }
}
