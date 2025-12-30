import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GAME_CONSTANTS } from '../../common/constants/game.constants';
import { ListPointsDto } from './dto/list-points.dto';
import { Point } from './entities/point.entity';
import { PointTypeService } from './point-type.service';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    private readonly pointTypeService: PointTypeService
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

  /**
   * 随机生成坐标
   * @param areaId 区域ID
   * @returns 返回坐标ID，如果无法生成则返回null
   */
  async generateRandomPoint(areaId: number): Promise<number | null> {
    // 1. 查表收集当前区域所有已存在的坐标
    const existingPoints = await this.pointRepository.find({
      where: { areaId },
      select: ['x', 'y'],
    });

    // 2. 建立两个长度为 MAX_POINT_SIZE 的数组（元素为 0 ~ MAX_POINT_SIZE - 1）
    const availableX: number[] = [];
    const availableY: number[] = [];
    for (let i = 0; i < GAME_CONSTANTS.MAX_POINT_SIZE; i++) {
      availableX.push(i);
      availableY.push(i);
    }

    // 3. 生成所有可能的坐标组合，并过滤掉已存在的坐标
    const availableCoords: Array<{ x: number; y: number }> = [];
    for (const x of availableX) {
      for (const y of availableY) {
        // 检查这个坐标组合是否已存在
        const exists = existingPoints.some(p => p.x === x && p.y === y);
        if (!exists) {
          availableCoords.push({ x, y });
        }
      }
    }

    // 4. 检查是否还有可用的坐标
    if (availableCoords.length === 0) {
      return null;
    }

    // 5. 从可用坐标中随机获取一个
    const randomIndex = Math.floor(Math.random() * availableCoords.length);
    const { x, y } = availableCoords[randomIndex];

    // 6. 调用生成地形函数生成地形
    const typeId = await this.pointTypeService.generateRandomPointType();

    // 7. 写入数据库，返回坐标 id
    const newPoint = this.pointRepository.create({
      areaId,
      x,
      y,
      typeId,
    });

    const savedPoint = await this.pointRepository.save(newPoint);
    return savedPoint.id;
  }
}
