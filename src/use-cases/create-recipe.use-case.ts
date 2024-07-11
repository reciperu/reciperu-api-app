import { Injectable } from '@nestjs/common';
import {
  IRecipeRepository,
  RecipeBeforePersist,
  CreateRecipeDto,
} from 'src/domain';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
@Injectable()
export class CreateRecipeUseCase {
  constructor(
    private readonly recipeRepository: IRecipeRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  private async processRecipeDto(
    createRecipesDto: CreateRecipeDto,
    userId: string,
    spaceId: string,
  ) {
    const recipeDto = {
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
    // thumbnailUrlがある場合はstorageに登録
    if (createRecipesDto.thumbnailUrl.length) {
      const { imageUrl, filename } =
        await this.firebaseService.uploadProfileImageToStorage(
          'recipe',
          createRecipesDto.thumbnailUrl,
          '',
        );
      if (imageUrl) {
        recipeDto.thumbnailUrl = imageUrl;
      }
      if (filename) {
        recipeDto.thumbnailFilename = filename;
      }
    }
    // imageUrlsがbase64の場合はstorageに登録
    if (createRecipesDto.imageUrls.length) {
      for (let i = 0; i < createRecipesDto.imageUrls.length; i++) {
        if (createRecipesDto.imageUrls[i].length) {
          const { imageUrl, filename } =
            await this.firebaseService.uploadProfileImageToStorage(
              'recipe',
              createRecipesDto.imageUrls[i],
              '',
            );
          if (imageUrl) {
            recipeDto.imageUrls[i] = imageUrl;
          }
          if (filename) {
            recipeDto.imageFilenames[i] = filename;
          }
        }
      }
    }
    return recipeDto;
  }
  async execute(
    createRecipesDto: CreateRecipeDto,
    userId: string,
    spaceId: string,
  ) {
    const recipeDto = await this.processRecipeDto(
      createRecipesDto,
      userId,
      spaceId,
    );
    return await this.recipeRepository.save(new RecipeBeforePersist(recipeDto));
  }
}
