import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { GAME_CONSTANTS } from '../../common/constants/game.constants';
import { AreaService } from '../map/area.service';
import { ListPointsDto } from '../map/dto/list-points.dto';
import { GlobalService } from '../map/global.service';
import { PointService } from '../map/point.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly globalService: GlobalService,
    private readonly areaService: AreaService,
    private readonly pointService: PointService
  ) {}

  /**
   * 创建角色
   * @param dto 创建用户DTO
   * @returns 创建的用户
   */
  async createUser(dto: CreateUserDto): Promise<User> {
    // 1. 检查账号是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { account: dto.account },
    });

    if (existingUser) {
      throw new ConflictException('账号已存在');
    }

    // 2. 确定初始星球
    const globalId = await this.determineInitialGlobal();

    // 3. 确定初始区域
    const areaId = await this.determineInitialArea(globalId);

    // 4. 确定初始坐标
    const pointId = await this.determineInitialPoint(areaId);

    // 5. 加密密码
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 6. 创建用户
    const newUser = this.userRepository.create({
      rolename: dto.rolename,
      account: dto.account,
      password: hashedPassword,
      pointId,
    });

    try {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('账号已存在');
      }
      throw new InternalServerErrorException('创建用户失败');
    }
  }

  /**
   * 确定初始星球
   * @returns 星球ID
   */
  private async determineInitialGlobal(): Promise<number> {
    const existingGlobals = await this.globalService.findAll();
    const N = existingGlobals.length;
    const M = GAME_CONSTANTS.MAX_GLOBAL;

    // 计算概率（限制在0-1之间）
    const probability = Math.min(N / M, 1);
    const random = Math.random();

    let globalId: number;

    if (random < probability && N > 0) {
      // 从已存在的星球中随机选择
      const randomIndex = Math.floor(Math.random() * N);
      globalId = existingGlobals[randomIndex].id;
    } else {
      // 新增星球
      globalId = (await this.globalService.generateRandomGlobal())!;
      if (!globalId) {
        // 如果无法新增（已达到上限），从已存在中选择
        if (N > 0) {
          const randomIndex = Math.floor(Math.random() * N);
          globalId = existingGlobals[randomIndex].id;
        } else {
          throw new InternalServerErrorException('无法创建星球，且没有已存在的星球');
        }
      }
    }

    return globalId;
  }

  /**
   * 确定初始区域
   * @param globalId 星球ID
   * @returns 区域ID
   */
  private async determineInitialArea(globalId: number): Promise<number> {
    const existingAreas = await this.areaService.findAll({ globalId });
    const N = existingAreas.length;
    const M = GAME_CONSTANTS.MAX_AREA;

    // 计算概率（限制在0-1之间）
    const probability = Math.min(N / M, 1);
    const random = Math.random();

    let areaId: number;

    if (random < probability && N > 0) {
      // 从已存在的区域中随机选择
      const randomIndex = Math.floor(Math.random() * N);
      areaId = existingAreas[randomIndex].id;
    } else {
      // 新增区域
      areaId = (await this.areaService.generateRandomArea(globalId))!;
      if (!areaId) {
        // 如果无法新增（已达到上限），从已存在中选择
        if (N > 0) {
          const randomIndex = Math.floor(Math.random() * N);
          areaId = existingAreas[randomIndex].id;
        } else {
          throw new InternalServerErrorException('无法创建区域，且没有已存在的区域');
        }
      }
    }

    return areaId;
  }

  /**
   * 确定初始坐标
   * @param areaId 区域ID
   * @returns 坐标ID
   */
  private async determineInitialPoint(areaId: number): Promise<number> {
    // 尝试生成新坐标
    let pointId = await this.pointService.generateRandomPoint(areaId);

    if (!pointId) {
      // 如果无法生成新坐标，从已存在的坐标中随机选择
      const listPointsDto: ListPointsDto = { areaId };
      const existingPoints = await this.pointService.findAll(listPointsDto);

      if (existingPoints.length > 0) {
        const randomIndex = Math.floor(Math.random() * existingPoints.length);
        pointId = existingPoints[randomIndex].id;
      } else {
        throw new InternalServerErrorException('该区域没有可用坐标');
      }
    }

    return pointId;
  }
}
