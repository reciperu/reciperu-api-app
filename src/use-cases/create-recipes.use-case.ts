import { Injectable } from '@nestjs/common';
import {
  IRecipeRepository,
  RecipeBeforePersist,
  CreateRecipeDto,
} from 'src/domain';
import { uploadImageToStorage } from 'src/functions/image';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
@Injectable()
export class CreateRecipesUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async execute(
    createRecipesDto: CreateRecipeDto[],
    userId: string,
    spaceId: string,
  ) {
    const recipesBeforePersist = await Promise.all(
      createRecipesDto.map(async (x) => {
        const recipeObject = {
          title: x.title,
          spaceId: spaceId,
          userId: userId,
          thumbnailUrl: x.thumbnailUrl,
          thumbnailFilename: '',
          imageUrls: x.imageUrls,
          imageFilenames: [],
          memo: x.memo,
          recipeUrl: x.recipeUrl,
          faviconUrl: x.faviconUrl,
          appName: x.appName,
        };
        // thumbnailUrlがある場合はstorageに登録
        if (x.thumbnailUrl.length) {
          const storage = this.firebaseService.admin.storage();
          const { imageUrl, filename } = await uploadImageToStorage(
            storage,
            'recipe',
            x.thumbnailUrl,
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
        if (x.imageUrls.length) {
          const storage = this.firebaseService.admin.storage();
          for (let i = 0; i < x.imageUrls.length; i++) {
            if (x.imageUrls[i].length) {
              const { imageUrl, filename } = await uploadImageToStorage(
                storage,
                'recipe',
                x.imageUrls[i],
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
        return new RecipeBeforePersist(recipeObject);
      }),
    );
    return await this.recipeRepository.bulkInsert(recipesBeforePersist);
  }
}
