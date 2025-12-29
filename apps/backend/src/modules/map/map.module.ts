import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global } from './entities/global.entity';
import { Area } from './entities/area.entity';
import { PointType } from './entities/point-type.entity';
import { Point } from './entities/point.entity';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { PointTypeService } from './point-type.service';
import { PointTypeController } from './point-type.controller';
import { PointService } from './point.service';
import { PointController } from './point.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Global, Area, PointType, Point])],
  controllers: [GlobalController, AreaController, PointTypeController, PointController],
  providers: [GlobalService, AreaService, PointTypeService, PointService],
})
export class MapModule {}
