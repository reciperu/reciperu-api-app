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
import { UpdateSpaceDto, ValidateInvitationDto } from './space.dto';
import {
  SpacePresenter,
  SpaceInvitationPresenter,
  SpaceJoinPresenter,
} from './space.presenter';
import {
  GetSpaceUseCase,
  UpdateSpaceUseCase,
  InviteSpaceUseCase,
  UseCaseProxy,
  UseCaseProxyModule,
  ValidateSpaceJoinUseCase,
} from 'src/use-cases';

import { Request } from 'express';
@ApiTags('spaces')
@ApiBearerAuth()
@Controller('spaces')
export class SpaceController {
  constructor(
    @Inject(UseCaseProxyModule.GET_SPACE_USE_CASE)
    private readonly getSpaceUseCase: UseCaseProxy<GetSpaceUseCase>,
    @Inject(UseCaseProxyModule.UPDATE_SPACE_USE_CASE)
    private readonly updateSpaceUseCase: UseCaseProxy<UpdateSpaceUseCase>,
    @Inject(UseCaseProxyModule.INVITE_SPACE_USE_CASE)
    private readonly inviteSpaceUseCase: UseCaseProxy<InviteSpaceUseCase>,
    @Inject(UseCaseProxyModule.VALIDATE_SPACE_JOIN_USE_CASE)
    private readonly validateSpaceJoinUseCase: UseCaseProxy<ValidateSpaceJoinUseCase>,
  ) {}

  @Get(':id')
  @ApiOperation({ operationId: 'getSpace' })
  @ApiResponse({
    status: 200,
    description: 'スペースとユーザー一覧取得',
    type: SpacePresenter,
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'spaceId',
  })
  async show(@Param('id') id: string) {
    return new SpacePresenter(
      await this.getSpaceUseCase.getInstance().execute(id),
    );
  }

  @Post('invitations')
  @ApiOperation({ operationId: 'invitationSpace' })
  @ApiResponse({
    status: 200,
    description: 'スペースの招待',
    type: SpaceInvitationPresenter,
  })
  async invitation(@Req() req: Request) {
    const invitation = await this.inviteSpaceUseCase
      .getInstance()
      .execute(req.currentUser.getSpaceId, req.currentUser.getId);

    return new SpaceInvitationPresenter({ token: invitation.getToken });
  }

  @Put('joins')
  @ApiOperation({ operationId: 'validateInvitation' })
  @ApiResponse({
    status: 200,
    description: 'スペース参加の検証',
    type: SpaceJoinPresenter,
  })
  async validate(
    @Req() req: Request,
    @Body() validateInvitationDto: ValidateInvitationDto,
  ) {
    await this.validateSpaceJoinUseCase
      .getInstance()
      .execute(validateInvitationDto.token, req.currentUser.getId);
    return new SpaceJoinPresenter();
  }

  @Put(':id')
  @ApiOperation({ operationId: 'updateSpace' })
  @ApiBody({
    type: UpdateSpaceDto,
  })
  @ApiResponse({
    status: 200,
    description: 'スペースの更新',
    type: SpacePresenter,
  })
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ) {
    return new SpacePresenter(
      await this.updateSpaceUseCase
        .getInstance()
        .execute(id, updateSpaceDto, req.currentUser.getId),
    );
  }
}
