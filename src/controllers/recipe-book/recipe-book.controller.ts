import { Controller, Get, Inject, Param, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateRecipeBookDto } from './recipe-book.dto';
import { RecipeBookPresenter } from './recipe-book.presenter';
import {
  GetRecipeBookUseCase,
  UseCaseProxy,
  UseCaseProxyModule,
} from 'src/use-cases';

@ApiTags('recipe-books')
@ApiBearerAuth()
@Controller('recipe-books')
export class RecipeBookController {
  constructor(
    @Inject(UseCaseProxyModule.GET_RECIPE_BOOK_USE_CASE)
    private readonly getRecipeBookUseCase: UseCaseProxy<GetRecipeBookUseCase>,
  ) {}
  @Put(':id')
  @ApiOperation({ operationId: 'updateRecipeBook' })
  @ApiBody({
    type: UpdateRecipeBookDto,
  })
  @ApiResponse({
    status: 200,
    description: '料理本更新',
    type: RecipeBookPresenter,
  })
  async update() {
    try {
    } catch (error) {}
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getRecipeBook' })
  @ApiResponse({
    status: 200,
    description: '料理本とユーザー一覧取得',
    type: RecipeBookPresenter,
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'recipeBookId',
  })
  async show(@Param('id') id: string) {
    return new RecipeBookPresenter(
      await this.getRecipeBookUseCase.getInstance().execute(id),
    );
    // TODO: 料理本とユーザー一覧取得
  }
}
