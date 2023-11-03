import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRecipeBookDto, UpdateRecipeBookDto } from './recipe-book.dto';
import { RecipePresenter } from '../recipe/presenter/recipe.presenter';
import { Request } from 'express';

@ApiTags('recipe-books')
@ApiBearerAuth()
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
  async create(@Body() createRecipeBookDto: CreateRecipeBookDto) {
    // Todo:スペース作成の処理もここに書く
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
