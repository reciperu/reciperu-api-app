import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSpaceDto } from './space.dto';
import { SpacePresenter } from './space.presenter';
import { Request } from 'express';

@ApiTags('spaces')
@ApiBearerAuth()
@Controller('spaces')
export class SpaceController {
  @Post()
  @ApiOperation({ operationId: 'createSpace' })
  @ApiBody({
    type: CreateSpaceDto,
  })
  @ApiResponse({
    status: 201,
    description: 'スペースと料理本を作成',
    type: SpacePresenter,
  })
  async create(@Req() req: Request, @Body() createSpaceDto: CreateSpaceDto) {
    // const userId = req.user.id;
    // スペース作成（SpaceUserとひもづけ）→料理本作成
  }
}
