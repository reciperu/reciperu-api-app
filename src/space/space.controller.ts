import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UpdateSpaceDto } from './dto/updateSpace.dto';
import { CreateSpaceDto } from './dto/createSpace.dto';
import { SpaceService } from './space.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpaceEntity } from './entities/space.entity';

@ApiTags('space')
@Controller('spaces')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}
  @Post()
  @ApiQuery({
    name: 'userUuid',
    type: String,
  })
  @ApiResponse({
    status: 201,
    description: 'The space has been successfully created.',
    type: SpaceEntity,
  })
  async create(
    @Req() request: Request,
    @Body() createSpaceDto: CreateSpaceDto,
  ) {
    try {
      return new SpaceEntity(
        await this.spaceService.create({
          userId: request['currentUser'].id,
          createSpaceDto,
        }),
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'spaceId',
  })
  @ApiResponse({
    status: 200,
    description: 'The spaces has been successfully retrieved.',
    type: SpaceEntity,
  })
  // request['currentUser'].spaceIdでもいけそうだが、API的にはidで明示しておく
  async show(@Param('id', ParseIntPipe) id: number) {
    try {
      const spaces = await this.spaceService.findOneById(id);
      return new SpaceEntity(spaces);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':uuid')
  @ApiParam({
    name: 'uuid',
    type: String,
    required: true,
    description: 'space uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The space has been successfully updated.',
    type: SpaceEntity,
  })
  async update(
    @Body() updateSpaceDto: UpdateSpaceDto,
    @Param('uuid') uuid: string,
  ) {
    try {
      return new SpaceEntity(
        await this.spaceService.update({ uuid, updateSpaceDto }),
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
