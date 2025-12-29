import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Global } from './entities/global.entity';
import { GlobalService } from './global.service';

@ApiTags('地图管理-星球')
@Controller('map/globals')
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get()
  @ApiOperation({ summary: '获取星球列表' })
  @ApiResponse({ status: 200, description: '成功获取星球列表', type: [Global] })
  async findAll(): Promise<Global[]> {
    return await this.globalService.findAll();
  }
}
