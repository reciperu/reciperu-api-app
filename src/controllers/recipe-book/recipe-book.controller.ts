import { Controller, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRecipeBookDto, UpdateRecipeBookDto } from './dto';
import { RecipePresenter } from '../recipe/presenter/recipe.presenter';

@ApiTags('recipe-books')
@Controller('recipe-books')
export class RecipeBookController {
  @Post()
  @ApiOperation({ operationId: 'createRecipeBook' })
  @ApiBody({
    type: CreateRecipeBookDto,
  })
  @ApiResponse({
    status: 201,
    description: '料理本作成',
    type: RecipePresenter,
  })
  async create() {
    try {
      // Todo:スペース作成の処理もここに書く
    } catch (error) {}
  }

  @Put(':id')
  @ApiOperation({ operationId: 'updateRecipeBook' })
  @ApiBody({
    type: UpdateRecipeBookDto,
  })
  @ApiResponse({
    status: 200,
    description: '料理本更新',
    type: RecipePresenter,
  })
  async update() {
    try {
    } catch (error) {}
  }
}
