import { Controller, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateRecipeBookDto } from './recipe-book.dto';
import { RecipePresenter } from '../recipe/presenter/recipe.presenter';
@ApiTags('recipe-books')
@ApiBearerAuth()
@Controller('recipe-books')
export class RecipeBookController {
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
