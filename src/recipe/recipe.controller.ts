import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RecipeEntity } from '../entities/recipe.entity';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';

@Controller('recipes')
export class RecipeController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The recipes has been successfully retrieved.',
    isArray: true,
    type: RecipeEntity,
  })
  @ApiTags('recipe')
  async index() {
    return 'hello';
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    description: 'The recipe has been successfully retrieved.',
    type: RecipeEntity,
  })
  @ApiTags('recipe')
  async show() {
    return 'hello';
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The recipe has been successfully created.',
    type: RecipeEntity,
  })
  @ApiTags('recipe')
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    // 画像のURLストレージ
    // リクエストボディ＋画像のURLをDBに保存
    return 'hello';
  }

  @Patch(':uuid')
  @ApiParam({
    name: 'uuid',
    type: String,
    required: true,
    description: 'recipe uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The recipe has been successfully updated.',
    type: RecipeEntity,
  })
  @ApiTags('recipe')
  async update(
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Param('uuid') uuid: string,
  ) {
    return 'hello';
  }

  @Delete(':uuid')
  @ApiTags('recipe')
  @ApiParam({
    name: 'uuid',
    type: String,
    required: true,
    description: 'recipe uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The recipe has been successfully deleted.',
  })
  async delete(@Param('uuid') uuid: string) {
    return 'hello';
  }

  @Get('/search')
  @ApiTags('recipe')
  @ApiQuery({
    name: 'genre',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'materials',
    isArray: true,
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'tags',
    type: String,
    isArray: true,
    required: false,
  })
  @ApiQuery({
    name: 'scene',
    type: String,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'The recipe has been successfully deleted.',
    isArray: true,
    type: RecipeEntity,
  })
  async search() {
    return 'hello';
  }
}
