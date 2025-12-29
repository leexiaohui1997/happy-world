import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { ListAreasDto } from './dto/list-areas.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>
  ) {}

  /**
   * 获取所有区域列表，可按星球筛选
   */
  async findAll(query: ListAreasDto): Promise<Area[]> {
    const { globalId } = query;
    const queryBuilder = this.areaRepository.createQueryBuilder('area');

    if (globalId) {
      queryBuilder.where('area.globalId = :globalId', { globalId });
    }

    return await queryBuilder.getMany();
  }
}
