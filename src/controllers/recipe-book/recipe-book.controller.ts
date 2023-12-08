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
import { UpdateRecipeBookDto, ValidateInvitationDto } from './recipe-book.dto';
import {
  RecipeBookPresenter,
  RecipeBookInvitationPresenter,
  RecipeBookJoinPresenter,
} from './recipe-book.presenter';
import {
  GetRecipeBookUseCase,
  UpdateRecipeBookUseCase,
  InviteRecipeBookUseCase,
  UseCaseProxy,
  UseCaseProxyModule,
  ValidateRecipeBookJoinUseCase,
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
    @Inject(UseCaseProxyModule.INVITE_RECIPE_BOOK_USE_CASE)
    private readonly inviteRecipeBookUseCase: UseCaseProxy<InviteRecipeBookUseCase>,
    @Inject(UseCaseProxyModule.VALIDATE_RECIPE_BOOK_JOIN_USE_CASE)
    private readonly validateRecipeBookJoinUseCase: UseCaseProxy<ValidateRecipeBookJoinUseCase>,
  ) {}

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
    const invitation = await this.inviteRecipeBookUseCase
      .getInstance()
      .execute(req.currentUser.getRecipeBookId, req.currentUser.getId);
    console.log('invitation', invitation);

    return new RecipeBookInvitationPresenter({ token: invitation.getToken });
  }

  @Put('joins')
  @ApiOperation({ operationId: 'validateInvitation' })
  @ApiResponse({
    status: 200,
    description: 'スペース参加の検証',
    type: RecipeBookJoinPresenter,
  })
  async validate(
    @Req() req: Request,
    @Body() validateInvitationDto: ValidateInvitationDto,
  ) {
    console.log('validateInvitationDto', validateInvitationDto);
    await this.validateRecipeBookJoinUseCase
      .getInstance()
      .execute(validateInvitationDto.token, req.currentUser.getId);
    return new RecipeBookJoinPresenter();
  }

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
}
