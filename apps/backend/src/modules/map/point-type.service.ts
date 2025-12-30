import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointType } from './entities/point-type.entity';

@Injectable()
export class PointTypeService {
  constructor(
    @InjectRepository(PointType)
    private readonly pointTypeRepository: Repository<PointType>
  ) {}

  /**
   * 获取所有地形列表
   */
  async findAll(): Promise<PointType[]> {
    return await this.pointTypeRepository.find();
  }

  /**
   * 随机生成地形
   * @returns 返回地形类型ID
   */
  async generateRandomPointType(): Promise<number> {
    // 查询所有地形类型
    const pointTypes = await this.pointTypeRepository.find();

    if (pointTypes.length === 0) {
      throw new Error('地形类型表为空，无法生成地形');
    }

    // 处理 rate，没有 rate 的默认 rate = 1
    const typesWithRate = pointTypes.map(type => ({
      id: type.id,
      rate: type.rate ?? 1,
    }));

    // 计算总权重
    const totalRate = typesWithRate.reduce((sum, type) => sum + type.rate, 0);

    if (totalRate === 0) {
      throw new Error('所有地形的生成概率都为0，无法生成地形');
    }

    // 生成随机数（0 到 totalRate 之间）
    const random = Math.random() * totalRate;

    // 按权重随机选择
    let currentSum = 0;
    for (const type of typesWithRate) {
      currentSum += type.rate;
      if (random <= currentSum) {
        return type.id;
      }
    }

    // 如果循环结束还没返回（理论上不会发生），返回最后一个
    return typesWithRate[typesWithRate.length - 1].id;
  }
}
