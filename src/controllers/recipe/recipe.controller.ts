import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Post,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  RecipePresenter,
  PaginatedRecipePresenter,
  RecipeMetaDataPresenter,
} from './recipe.presenter';
import { CreateRecipeDto, UpdateRecipeDto } from './recipe.dto';
import {
  UseCaseProxyModule,
  UseCaseProxy,
  CreateRecipesUseCase,
  CreateRecipeUseCase,
  UpdateRecipeUseCase,
  GetRecipeDetailUseCase,
  GetRecipeListUseCase,
} from 'src/use-cases';
import { Request } from 'express';

@ApiTags('recipes')
@ApiBearerAuth()
@Controller('recipes')
export class RecipeController {
  constructor(
    @Inject(UseCaseProxyModule.CREATE_RECIPES_USE_CASE)
    private readonly createRecipesUseCase: UseCaseProxy<CreateRecipesUseCase>,
    @Inject(UseCaseProxyModule.CREATE_RECIPE_USE_CASE)
    private readonly createRecipeUseCase: UseCaseProxy<CreateRecipeUseCase>,
    @Inject(UseCaseProxyModule.UPDATE_RECIPE_USE_CASE)
    private readonly updateRecipeUseCase: UseCaseProxy<UpdateRecipeUseCase>,
    @Inject(UseCaseProxyModule.GET_RECIPE_DETAIL_USE_CASE)
    private readonly getRecipeDetailUseCase: UseCaseProxy<GetRecipeDetailUseCase>,
    @Inject(UseCaseProxyModule.GET_RECIPE_LIST_USE_CASE)
    private readonly getRecipeListUseCase: UseCaseProxy<GetRecipeListUseCase>,
  ) {}
  @Get()
  @ApiOperation({ operationId: 'getRecipe' })
  @ApiQuery({
    name: 'cursor',
    description: 'カーソル',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'favorite',
    description: 'お気に入りかどうか',
    type: Boolean,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'レシピ一覧取得',
    type: PaginatedRecipePresenter,
  })
  async index(
    @Req() req: Request,
    @Query('favorite') favorite: boolean | undefined,
    @Query('cursor') cursor: string | undefined,
  ) {
    const recipes = await this.getRecipeListUseCase
      .getInstance()
      .execute(req.currentUser.getSpaceId, cursor, { favorite });
    return new PaginatedRecipePresenter(
      recipes.map((x) => new RecipePresenter(x)),
    );
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getRecipe' })
  @ApiResponse({
    status: 200,
    description: 'レシピ詳細取得',
    type: RecipePresenter,
  })
  async show(@Param('id') id: string) {
    return new RecipePresenter(
      await this.getRecipeDetailUseCase.getInstance().execute(id),
    );
  }

  @Get('meta-data')
  @ApiQuery({
    name: 'recipeUrl',
    description: 'レシピURL',
    type: String,
  })
  @ApiOperation({ operationId: 'getRecipeMetaData' })
  @ApiResponse({
    status: 200,
    description: 'レシピメタデータ取得',
    type: RecipeMetaDataPresenter,
  })
  async showMetaData() {
    try {
    } catch (error) {}
  }

  @Post()
  @ApiOperation({ operationId: 'createRecipe' })
  @ApiResponse({
    status: 201,
    description: 'レシピ登録',
    type: RecipePresenter,
  })
  @ApiBody({
    type: CreateRecipeDto,
  })
  async create(@Req() req: Request, @Body() createRecipeDto: CreateRecipeDto) {
    return new RecipePresenter(
      await this.createRecipeUseCase
        .getInstance()
        .execute(
          createRecipeDto,
          req.currentUser.getId,
          req.currentUser.getSpaceId,
        ),
    );
  }

  @Put(':id')
  @ApiOperation({ operationId: 'updateRecipe' })
  @ApiResponse({
    status: 200,
    description: 'レシピ更新',
    type: RecipePresenter,
  })
  @ApiBody({
    type: UpdateRecipeDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return new RecipePresenter(
      await this.updateRecipeUseCase.getInstance().execute(id, updateRecipeDto),
    );
  }

  @Post('bulk')
  @ApiOperation({ operationId: 'bulkInsertRecipes' })
  @ApiBody({
    type: CreateRecipeDto,
    isArray: true,
  })
  @ApiResponse({
    status: 201,
    description: 'レシピ一括登録',
    type: RecipePresenter,
    isArray: true,
  })
  async createMany(
    @Req() req: Request,
    @Body() createRecipesDto: CreateRecipeDto[],
  ) {
    const createRecipes = await this.createRecipesUseCase
      .getInstance()
      .execute(
        createRecipesDto,
        req.currentUser.getId,
        req.currentUser.getSpaceId,
      );
    return createRecipes.map((x) => new RecipePresenter(x));
  }
}
