import { BaseEntity } from '../../../common/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Area } from './area.entity';

@Entity('globals')
export class Global extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  icon?: string;

  @OneToMany(() => Area, area => area.global)
  areas: Area[];
}
