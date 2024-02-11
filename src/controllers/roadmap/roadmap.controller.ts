import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { createClient } from 'microcms-js-sdk';
import { RoadmapPresenter } from './roadmap.presenter';

const client = createClient({
  serviceDomain: 'sharely',
  apiKey: process.env.MICROCMS_API_KEY,
});

@ApiTags('roadmap')
@ApiBearerAuth()
@Controller('roadmap')
export class RoadmapController {
  @Get()
  @ApiOperation({ operationId: 'roadmap' })
  @ApiResponse({
    status: 200,
    description: 'ロードマップを取得する',
    type: RoadmapPresenter,
  })
  async getRoadmap() {
    const result = await client.get({
      endpoint: 'roadmap',
      queries: { limit: 20 },
    });
    return result.contents;
  }
}
