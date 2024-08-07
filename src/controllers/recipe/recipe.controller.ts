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
  Delete,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import {
  RecipePresenter,
  PaginatedRecipePresenter,
  RecipeMetaDataPresenter,
  RequestedRecipePresenterByUser,
} from './recipe.presenter';
import {
  CreateRecipeDto,
  UpdateRecipeDto,
  CreateRequestedRecipeDto,
} from './recipe.dto';
import {
  UseCaseProxyModule,
  UseCaseProxy,
  CreateRecipesUseCase,
  CreateRecipeUseCase,
  UpdateRecipeUseCase,
  GetRecipeDetailUseCase,
  GetRecipeListUseCase,
  GetRecipeMetaDateUseCase,
  CreateRequestedRecipeUseCase,
  DeleteRequestedRecipeUseCase,
  GetRequestedRecipeListByUserUseCase,
} from 'src/use-cases';
import { Request } from 'express';
import { SuccessPresenter } from '../common/success.presenter';
import { ParseOptionalIntPipe } from 'src/pipes/parseOptionalInt.pipe';

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
    @Inject(UseCaseProxyModule.GET_REQUESTED_RECIPE_LIST_BY_USER_USE_CASE)
    private readonly getRequestedRecipeListByUserUseCase: UseCaseProxy<GetRequestedRecipeListByUserUseCase>,
    @Inject(UseCaseProxyModule.GET_RECIPE_META_DATE_USE_CASE)
    private readonly getRecipeMetaDataUseCase: UseCaseProxy<GetRecipeMetaDateUseCase>,
    @Inject(UseCaseProxyModule.CREATE_REQUESTED_RECIPE_USE_CASE)
    private readonly createRequestedRecipeUseCase: UseCaseProxy<CreateRequestedRecipeUseCase>,
    @Inject(UseCaseProxyModule.DELETE_REQUESTED_RECIPE_USE_CASE)
    private readonly deleteRequestedRecipeUseCase: UseCaseProxy<DeleteRequestedRecipeUseCase>,
  ) {}
  @Get()
  @ApiOperation({ operationId: 'getRecipe' })
  @ApiQuery({
    name: 'cursor',
    description: 'カーソル',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'isRequested',
    description: '食べたい料理かどうか',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'title',
    description: 'レシピ名（部分一致）',
    type: String,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'レシピ一覧取得',
    type: PaginatedRecipePresenter,
  })
  async index(
    @Req() req: Request,
    @Query('cursor', new DefaultValuePipe(''), ParseOptionalIntPipe)
    cursor: number | undefined,
    @Query('isRequested') isRequested: boolean | undefined,
    @Query('title') title: string | undefined,
  ) {
    const recipes = await this.getRecipeListUseCase
      .getInstance()
      .execute(req.currentUser.getSpaceId, {
        cursor,
        requestUserId: isRequested ? req.currentUser.getId : undefined,
        title,
      });
    return new PaginatedRecipePresenter(
      recipes.map((x) => new RecipePresenter(x)),
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
  async showMetaData(@Query('recipeUrl') recipeUrl: string) {
    return new RecipeMetaDataPresenter(
      await this.getRecipeMetaDataUseCase.getInstance().execute(recipeUrl),
    );
  }

  @Get('user-group-requests')
  @ApiOperation({ operationId: 'getRequestedRecipesByUser' })
  @ApiResponse({
    status: 200,
    description: 'スペースの食べたいに設定したユーザーごとのレシピ一覧取得',
    type: RequestedRecipePresenterByUser,
  })
  async getRequestedRecipes(@Req() req: Request) {
    const requestedRecipesByUser =
      await this.getRequestedRecipeListByUserUseCase
        .getInstance()
        .execute(req.currentUser.getSpaceId);

    return new RequestedRecipePresenterByUser(requestedRecipesByUser);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getRecipe' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'recipeId',
  })
  @ApiResponse({
    status: 200,
    description: 'レシピ詳細取得',
    type: RecipePresenter,
  })
  async show(@Param('id', ParseIntPipe) id: number) {
    return new RecipePresenter(
      await this.getRecipeDetailUseCase.getInstance().execute(id),
    );
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
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'recipeId',
  })
  @ApiBody({
    type: UpdateRecipeDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
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

  @Post('requests')
  @ApiOperation({ operationId: 'createRequestedRecipe' })
  @ApiResponse({
    status: 201,
    description: 'リクエストレシピ登録',
    type: SuccessPresenter,
  })
  @ApiBody({
    type: CreateRequestedRecipeDto,
  })
  async createRequestedRecipe(
    @Req() req: Request,
    @Body() createRequestedRecipeDto: CreateRequestedRecipeDto,
  ) {
    await this.createRequestedRecipeUseCase
      .getInstance()
      .execute(createRequestedRecipeDto, req.currentUser.getId);
    return new SuccessPresenter();
  }

  @Delete(':id/requests')
  @ApiOperation({ operationId: 'deleteRequestedRecipe' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'recipeId',
  })
  @ApiResponse({
    status: 201,
    description: 'リクエストレシピ削除',
    type: SuccessPresenter,
  })
  async deleteRequestedRecipe(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.deleteRequestedRecipeUseCase
      .getInstance()
      .execute(id, req.currentUser.getId);
    return new SuccessPresenter();
  }
}
