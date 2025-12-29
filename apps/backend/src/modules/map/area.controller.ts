import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Area } from './entities/area.entity';
import { AreaService } from './area.service';
import { ListAreasDto } from './dto/list-areas.dto';

@ApiTags('地图管理-区域')
@Controller('map/areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get()
  @ApiOperation({ summary: '获取区域列表' })
  @ApiQuery({ name: 'globalId', required: false, description: '按星球ID筛选' })
  @ApiResponse({ status: 200, description: '成功获取区域列表', type: [Area] })
  async findAll(@Query() query: ListAreasDto): Promise<Area[]> {
    return await this.areaService.findAll(query);
  }
}
