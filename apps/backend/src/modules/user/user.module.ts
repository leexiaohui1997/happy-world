import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MapModule } from '../map/map.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MapModule, // 导入 MapModule 以使用 GlobalService、AreaService、PointService
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 导出 UserService，供其他模块使用
})
export class UserModule {}
