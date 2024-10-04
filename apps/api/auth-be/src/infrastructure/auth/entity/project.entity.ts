import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 20 })
  name: string;
}
