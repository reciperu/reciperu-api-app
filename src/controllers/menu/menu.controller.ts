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
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { MenuPresenter, PaginatedMenuPresenter } from './menu.presenter';
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
import { SuccessPresenter } from '../common/success.presenter';

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
    type: Number,
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
    @Query('cursor', ParseIntPipe) cursor: number | undefined,
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
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'menuId',
  })
  @ApiResponse({
    status: 200,
    description: '献立の更新',
    type: MenuPresenter,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return new MenuPresenter(
      await this.updateMenuUseCase.getInstance().execute(id, updateMenuDto),
    );
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteMenu' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'menuId',
  })
  @ApiResponse({
    status: 200,
    description: '献立の削除',
    type: SuccessPresenter,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteMenuUseCase.getInstance().execute(id);
    return new SuccessPresenter();
  }
}
