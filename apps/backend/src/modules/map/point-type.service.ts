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
}
