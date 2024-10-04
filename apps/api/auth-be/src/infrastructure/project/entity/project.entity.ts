import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 20 })
  name: string;
}
