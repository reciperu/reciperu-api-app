import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UpsertSpaceDto } from './dto/upsertSpace.dto';
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
    @Body() upsertSpaceDto: UpsertSpaceDto,
  ) {
    try {
      const userId = request['currentUser'].id;
      const newSpace = await this.spaceService.create({
        userId,
        upsertSpaceDto,
      });
      return new SpaceEntity(newSpace);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':uuid')
  @ApiParam({
    name: 'uuid',
    type: String,
    required: true,
    description: 'space uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The spaces has been successfully retrieved.',
    type: SpaceEntity,
  })
  async show() {
    try {
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
  async update(@Body() upsertSpaceDto: UpsertSpaceDto) {
    try {
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
