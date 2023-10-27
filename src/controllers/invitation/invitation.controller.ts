import { Controller, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InvitationPresenter } from './invitation.presenter';
import { ValidateInvitationDto } from './dto';

@ApiTags('invitations')
@ApiBearerAuth()
@Controller('invitations')
export class InvitationController {
  @Post('invitation')
  @ApiOperation({ operationId: 'invitationSpace' })
  @ApiResponse({
    status: 200,
    description: 'スペース招待',
    type: InvitationPresenter,
  })
  async invitation() {
    try {
    } catch (error) {}
  }

  @Put()
  @ApiOperation({ operationId: 'validateInvitation' })
  @ApiBody({
    type: ValidateInvitationDto,
  })
  @ApiResponse({
    status: 200,
    description: 'スペース参加の検証',
    type: InvitationPresenter,
  })
  async validate() {
    try {
    } catch (error) {}
  }
}
