import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PointType } from './entities/point-type.entity';
import { PointTypeService } from './point-type.service';

@ApiTags('地图管理-地形')
@Controller('map/point-types')
export class PointTypeController {
  constructor(private readonly pointTypeService: PointTypeService) {}

  @Get()
  @ApiOperation({ summary: '获取地形列表' })
  @ApiResponse({ status: 200, description: '成功获取地形列表', type: [PointType] })
  async findAll(): Promise<PointType[]> {
    return await this.pointTypeService.findAll();
  }
}
