import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  DeleteMenuPresenter,
  MenuPresenter,
  PaginatedMenuPresenter,
} from './menu.presenter';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import {
  UseCaseProxyModule,
  CreateMenuUseCase,
  UseCaseProxy,
  UpdateMenuUseCase,
  DeleteMenuUseCase,
  GetMenuListUseCase,
} from 'src/use-cases';
import { Request } from 'express';
import { MenuStatusKey } from 'src/domain';

@ApiTags('menus')
@ApiBearerAuth()
@Controller('menus')
export class MenuController {
  constructor(
    @Inject(UseCaseProxyModule.CREATE_MENU_USE_CASE)
    private readonly createMenuUseCase: UseCaseProxy<CreateMenuUseCase>,
    @Inject(UseCaseProxyModule.UPDATE_MENU_USE_CASE)
    private readonly updateMenuUseCase: UseCaseProxy<UpdateMenuUseCase>,
    @Inject(UseCaseProxyModule.DELETE_MENU_USE_CASE)
    private readonly deleteMenuUseCase: UseCaseProxy<DeleteMenuUseCase>,
    @Inject(UseCaseProxyModule.GET_MENU_LIST_USE_CASE)
    private readonly getMenuListUseCase: UseCaseProxy<GetMenuListUseCase>,
  ) {}
  @Get()
  @ApiOperation({ operationId: 'getMenu' })
  @ApiQuery({
    name: 'cursor',
    description: 'カーソル',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'statuses',
    description: 'ステータス',
    isArray: true,
    type: String,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: '献立ー一覧取得',
    type: PaginatedMenuPresenter,
  })
  async index(
    @Req() req: Request,
    @Query('cursor') cursor: string | undefined,
    @Query('statuses') statuses: MenuStatusKey[] | undefined,
  ) {
    const menus = await this.getMenuListUseCase.getInstance().execute({
      spaceId: req.currentUser.getSpaceId,
      cursor,
      statuses: Array.isArray(statuses) ? statuses : [statuses],
    });
    return new PaginatedMenuPresenter(
      menus.map((menu) => new MenuPresenter(menu)),
    );
  }

  @Get('pending')
  @ApiOperation({ operationId: 'getPendingMenu' })
  @ApiResponse({
    status: 200,
    description: '提案メニュー一覧取得',
    type: MenuPresenter,
    isArray: true,
  })
  async getPendingMenus() {
    try {
    } catch (error) {}
  }

  @Post()
  @ApiOperation({ operationId: 'createMenu' })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({
    status: 200,
    description: '献立の作成',
    type: MenuPresenter,
  })
  async create(@Req() req: Request, @Body() createMenuDto: CreateMenuDto) {
    return new MenuPresenter(
      await this.createMenuUseCase
        .getInstance()
        .execute(
          createMenuDto,
          req.currentUser.getId,
          req.currentUser.getSpaceId,
        ),
    );
  }

  @Put(':id')
  @ApiOperation({ operationId: 'updateMenu' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({
    status: 200,
    description: '献立の更新',
    type: MenuPresenter,
  })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return new MenuPresenter(
      await this.updateMenuUseCase.getInstance().execute(id, updateMenuDto),
    );
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteMenu' })
  @ApiResponse({
    status: 200,
    description: '献立の削除',
    type: DeleteMenuPresenter,
  })
  async delete(@Param('id') id: string) {
    await this.deleteMenuUseCase.getInstance().execute(id);

    return { success: true };
  }
}
