import { BaseEntity } from '../../../common/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Point } from './point.entity';

@Entity('point_types')
export class PointType extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  icon?: string;

  /** 生成概率，整数，默认值为1 */
  @Column({ type: 'int', default: 1 })
  rate: number;

  @OneToMany(() => Point, point => point.type)
  points: Point[];
}
