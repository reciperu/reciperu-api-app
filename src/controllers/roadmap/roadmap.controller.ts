import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { createClient } from 'microcms-js-sdk';
import { RoadmapPresenter } from './roadmap.presenter';
import { ConfigService } from '@nestjs/config';

@ApiTags('roadmap')
@ApiBearerAuth()
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @ApiOperation({ operationId: 'roadmap' })
  @ApiResponse({
    status: 200,
    description: 'ロードマップを取得する',
    type: RoadmapPresenter,
  })
  async getRoadmap() {
    const client = createClient({
      serviceDomain: 'sharely',
      apiKey: this.configService.get('MICROCMS_API_KEY'),
    });
    const result = await client.get({
      endpoint: 'roadmap',
      queries: { limit: 20 },
    });
    return result.contents;
  }
}
