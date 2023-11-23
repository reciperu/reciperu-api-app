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
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateRecipeBookDto } from './recipe-book.dto';
import {
  RecipeBookPresenter,
  RecipeBookInvitationPresenter,
} from './recipe-book.presenter';
import {
  GetRecipeBookUseCase,
  UpdateRecipeBookUseCase,
  InvitationRecipeBookUseCase,
  UseCaseProxy,
  UseCaseProxyModule,
} from 'src/use-cases';

import { Request } from 'express';
@ApiTags('recipe-books')
@ApiBearerAuth()
@Controller('recipe-books')
export class RecipeBookController {
  constructor(
    @Inject(UseCaseProxyModule.GET_RECIPE_BOOK_USE_CASE)
    private readonly getRecipeBookUseCase: UseCaseProxy<GetRecipeBookUseCase>,
    @Inject(UseCaseProxyModule.UPDATE_RECIPE_BOOK_USE_CASE)
    private readonly updateRecipeBookUseCase: UseCaseProxy<UpdateRecipeBookUseCase>,
    @Inject(UseCaseProxyModule.INVITATION_RECIPE_BOOK_USE_CASE)
    private readonly invitationRecipeBookUseCase: UseCaseProxy<InvitationRecipeBookUseCase>,
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
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateRecipeBookDto: UpdateRecipeBookDto,
  ) {
    console.log(id, updateRecipeBookDto, 'id, updateRecipeBookDto');

    return new RecipeBookPresenter(
      await this.updateRecipeBookUseCase
        .getInstance()
        .execute(id, updateRecipeBookDto, req.currentUser.getId),
    );
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
  }

  @Post('invitations')
  @ApiOperation({ operationId: 'invitationSpace' })
  @ApiResponse({
    status: 200,
    description: '料理本の招待',
    type: RecipeBookInvitationPresenter,
  })
  async invitation(@Req() req: Request) {
    return new RecipeBookInvitationPresenter(
      await this.invitationRecipeBookUseCase
        .getInstance()
        .execute(req.currentUser.getRecipeBookId),
    );
  }
}
