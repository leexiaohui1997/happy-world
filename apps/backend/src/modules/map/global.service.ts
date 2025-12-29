import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Global } from './entities/global.entity';

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
}
