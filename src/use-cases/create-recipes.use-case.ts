import { Injectable } from '@nestjs/common';
import {
  IRecipeRepository,
  RecipeBeforePersist,
  CreateRecipeDto,
} from 'src/domain';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
@Injectable()
export class CreateRecipesUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  private async processRecipesDto(
    createRecipesDto: CreateRecipeDto[],
    userId: string,
    spaceId: string,
  ) {
    return await Promise.all(
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
          const { imageUrl, filename } =
            await this.firebaseService.uploadProfileImageToStorage(
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
          for (let i = 0; i < x.imageUrls.length; i++) {
            if (x.imageUrls[i].length) {
              const { imageUrl, filename } =
                await this.firebaseService.uploadProfileImageToStorage(
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
  }

  async execute(
    createRecipesDto: CreateRecipeDto[],
    userId: string,
    spaceId: string,
  ) {
    const recipesDto = await this.processRecipesDto(
      createRecipesDto,
      userId,
      spaceId,
    );
    return await this.recipeRepository.bulkInsert(recipesDto);
  }
}
