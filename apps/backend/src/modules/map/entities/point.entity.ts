import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Area } from './area.entity';
import { PointType } from './point-type.entity';

@Entity('points')
@Unique(['areaId', 'x', 'y']) // 同一区域下x和y坐标组合唯一
export class Point extends BaseEntity {
  @ManyToOne(() => Area, area => area.points)
  area: Area;

  @Column()
  areaId: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @ManyToOne(() => PointType, pointType => pointType.points)
  type: PointType;

  @Column()
  typeId: number;
}
