import { BaseEntity } from '../../../common/entity/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Global } from './global.entity';
import { Point } from './point.entity';

@Entity('areas')
export class Area extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Global, global => global.areas)
  global: Global;

  @Column()
  globalId: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  boundary?: string;

  @OneToMany(() => Point, point => point.area)
  points: Point[];
}
