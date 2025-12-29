import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from './entities/point.entity';
import { ListPointsDto } from './dto/list-points.dto';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>
  ) {}

  /**
   * 获取所有坐标列表，可按区域筛选
   */
  async findAll(query: ListPointsDto): Promise<Point[]> {
    const { areaId } = query;
    const queryBuilder = this.pointRepository
      .createQueryBuilder('point')
      .leftJoinAndSelect('point.area', 'area')
      .leftJoinAndSelect('point.type', 'type');

    if (areaId) {
      queryBuilder.where('point.areaId = :areaId', { areaId });
    }

    return await queryBuilder.getMany();
  }
}
