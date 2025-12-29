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

  @OneToMany(() => Point, point => point.type)
  points: Point[];
}
