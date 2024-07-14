import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Post,
  Req,
  ParseIntPipe,
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
import { SpacePresenter, SpaceInvitationPresenter } from './space.presenter';
import {
  GetSpaceUseCase,
  UpdateSpaceUseCase,
  InviteSpaceUseCase,
  UseCaseProxy,
  UseCaseProxyModule,
  ValidateSpaceJoinUseCase,
} from 'src/use-cases';
import { Request } from 'express';
import { SuccessPresenter } from '../common/success.presenter';
import * as dayjs from 'dayjs';

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
    type: Number,
    required: true,
    description: 'spaceId',
  })
  async show(@Param('id', ParseIntPipe) id: number) {
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

    return new SpaceInvitationPresenter({
      token: invitation.getToken,
      expiredAt: dayjs(invitation.getExpiredAt).format('YYYY-MM-DD HH:mm:ss'),
    });
  }

  @Put('joins')
  @ApiOperation({ operationId: 'validateInvitation' })
  @ApiResponse({
    status: 200,
    description: 'スペース参加の検証',
    type: SuccessPresenter,
  })
  async validate(
    @Req() req: Request,
    @Body() validateInvitationDto: ValidateInvitationDto,
  ) {
    await this.validateSpaceJoinUseCase
      .getInstance()
      .execute(validateInvitationDto.token, req.currentUser.getId);
    return new SuccessPresenter();
  }

  @Put(':id')
  @ApiOperation({ operationId: 'updateSpace' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'spaceId',
  })
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ) {
    return new SpacePresenter(
      await this.updateSpaceUseCase
        .getInstance()
        .execute(id, updateSpaceDto, req.currentUser.getId),
    );
  }
}
