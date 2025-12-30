import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { ListAreasDto } from './dto/list-areas.dto';
import { GAME_CONSTANTS } from '../../common/constants/game.constants';

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

  /**
   * 随机生成区域
   * @param globalId 星球ID
   * @returns 返回区域ID，如果无法生成则返回null
   */
  async generateRandomArea(globalId: number): Promise<number | null> {
    // 1. 判断该星球下的区域数量是否达到上限
    const count = await this.areaRepository.count({
      where: { globalId },
    });

    if (count >= GAME_CONSTANTS.MAX_AREA) {
      return null;
    }

    // 2. 生成区域名称（当前总数 + 1，前导两个0）
    const nextNumber = count + 1;
    const name = `区域${String(nextNumber).padStart(3, '0')}`;

    // 3. 新增区域并返回id
    const newArea = this.areaRepository.create({
      name,
      globalId,
    });

    const savedArea = await this.areaRepository.save(newArea);
    return savedArea.id;
  }
}
