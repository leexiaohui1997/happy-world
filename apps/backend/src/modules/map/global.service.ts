import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Global } from './entities/global.entity';
import { GAME_CONSTANTS } from '../../common/constants/game.constants';

@Injectable()
export class GlobalService {
  constructor(
    @InjectRepository(Global)
    private readonly globalRepository: Repository<Global>
  ) {}

  /**
   * 获取所有星球列表
   */
  async findAll(): Promise<Global[]> {
    return await this.globalRepository.find();
  }

  /**
   * 随机生成星球
   * @returns 返回星球ID，如果无法生成则返回null
   */
  async generateRandomGlobal(): Promise<number | null> {
    // 1. 判断星球数量是否达到上限
    const count = await this.globalRepository.count();
    if (count >= GAME_CONSTANTS.MAX_GLOBAL) {
      return null;
    }

    // 2. 生成星球名称（当前总数 + 1，前导两个0）
    const nextNumber = count + 1;
    const name = `星球${String(nextNumber).padStart(3, '0')}`;

    // 3. 新增星球并返回id
    const newGlobal = this.globalRepository.create({
      name,
    });

    const savedGlobal = await this.globalRepository.save(newGlobal);
    return savedGlobal.id;
  }
}
