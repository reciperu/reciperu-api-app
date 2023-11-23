import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RecipePresenter } from './recipe.presenter';
import { CreateRecipeDto, UpdateRecipeDto } from './recipe.dto';
import {
  UseCaseProxyModule,
  UseCaseProxy,
  CreateRecipesUseCase,
  CreateRecipeUseCase,
  UpdateRecipeUseCase,
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
  ) {}
  @Get()
  @ApiOperation({ operationId: 'getRecipe' })
  @ApiResponse({
    status: 200,
    description: 'レシピ一覧取得',
    type: RecipePresenter,
    isArray: true,
  })
  async index() {
    try {
    } catch (error) {}
  }

  @Get('favorite')
  @ApiOperation({ operationId: 'getRecipeByFavorite' })
  @ApiResponse({
    status: 200,
    description: 'お気に入りレシピ一覧取得',
    type: RecipePresenter,
    isArray: true,
  })
  async indexByFavorite() {
    try {
    } catch (error) {}
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getRecipe' })
  @ApiResponse({
    status: 200,
    description: 'レシピ詳細取得',
    type: RecipePresenter,
  })
  async show() {
    try {
    } catch (error) {}
  }

  @Get('meta-data')
  @ApiQuery({
    name: 'recipeIds',
    description: 'レシピID',
    type: String,
    isArray: true,
  })
  @ApiOperation({ operationId: 'getRecipeMetaData' })
  @ApiResponse({
    status: 200,
    description: 'レシピメタデータ取得',
    type: RecipePresenter,
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
          req.currentUser.getRecipeBookId,
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
        req.currentUser.getRecipeBookId,
      );
    return createRecipes.map((x) => new RecipePresenter(x));
  }
}
