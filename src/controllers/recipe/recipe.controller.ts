import { Controller, Get, Patch, Post } from '@nestjs/common';
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

@ApiTags('recipes')
@ApiBearerAuth()
@Controller('recipes')
export class RecipeController {
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
  async create() {
    try {
    } catch (error) {}
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateRecipe' })
  @ApiResponse({
    status: 200,
    description: 'レシピ更新',
    type: RecipePresenter,
  })
  @ApiBody({
    type: UpdateRecipeDto,
  })
  async update() {
    try {
    } catch (error) {}
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
  async bulkInsert() {
    try {
    } catch (error) {}
  }
}
