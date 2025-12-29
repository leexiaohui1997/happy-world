import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Point } from './entities/point.entity';
import { PointService } from './point.service';
import { ListPointsDto } from './dto/list-points.dto';

@ApiTags('地图管理-坐标')
@Controller('map/points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Get()
  @ApiOperation({ summary: '获取坐标列表' })
  @ApiQuery({ name: 'areaId', required: false, description: '按区域ID筛选' })
  @ApiResponse({ status: 200, description: '成功获取坐标列表', type: [Point] })
  async findAll(@Query() query: ListPointsDto): Promise<Point[]> {
    return await this.pointService.findAll(query);
  }
}
