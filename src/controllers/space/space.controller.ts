import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
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
import {
  UseCaseProxyModule,
  CreateSpaceUseCase,
  UseCaseProxy,
} from 'src/use-cases';

@ApiTags('spaces')
@ApiBearerAuth()
@Controller('spaces')
export class SpaceController {
  constructor(
    @Inject(UseCaseProxyModule.CREATE_SPACE_USE_CASE)
    private readonly createSpaceUseCase: UseCaseProxy<CreateSpaceUseCase>,
  ) {}
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
    const createdSpace = await this.createSpaceUseCase.getInstance().execute({
      userId: req.currentUser.getId,
      recipeBookName: createSpaceDto.recipeBookName,
    });
    return new SpacePresenter(createdSpace);
  }
}
