import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Point } from '../../map/entities/point.entity';

@Entity('users')
export class User extends BaseEntity {
  /** 角色名称 */
  @Column({ name: 'rolename' })
  rolename: string;

  /** 账号，唯一 */
  @Column({ unique: true })
  account: string;

  /** 密码 */
  @Column()
  password: string;

  /** 当前坐标Id，关联坐标表 points */
  @Column({ name: 'point_id', nullable: true })
  pointId?: number;

  /** 当前坐标关联关系 */
  @ManyToOne(() => Point, { nullable: true })
  point?: Point;
}
