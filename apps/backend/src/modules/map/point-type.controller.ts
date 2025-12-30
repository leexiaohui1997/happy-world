import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePointTypeDto } from './dto/create-point-type.dto';
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

  @Post()
  @ApiOperation({ summary: '创建新地形' })
  @ApiResponse({ status: 201, description: '成功创建地形', type: PointType })
  async create(@Body() createPointTypeDto: CreatePointTypeDto): Promise<PointType> {
    return await this.pointTypeService.create(createPointTypeDto);
  }
}
